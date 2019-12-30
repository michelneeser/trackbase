const express = require('express');
const Collection = require('../../models/Collection');

const router = express.Router();

// @route    GET /api/collections
// @desc     returns all collections
// @access   public
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find().sort({ created: -1 });
    res.send(collections.map(collection => transformCollection(req, collection)));
  } catch (error) {
    console.error(error);
    setUnknownError(res, 'Error while getting all collections');
  }
});

// @route    POST /api/collections
// @desc     creates a new collection
// @access   public
router.post('/', async (req, res) => {
  try {
    const collection = await new Collection().save();
    res.send(collection);
  } catch (error) {
    console.error(error);
    setUnknownError(res, 'Error while creating new collection');
  }
});

// @route    GET /api/collections/:collectionId
// @desc     returns a single collection
// @access   public
router.get('/:collectionId', async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const collection = await getCollection(collectionId);
    res.send(transformCollection(req, collection));
  } catch (error) {
    console.error(error);
    setCollectionNotFound(res);
  }
});

// @route    PUT /api/collections/:collectionId
// @desc     updates a single stat (currently, properties 'name', 'description' and 'public' can be updated)
// @access   public
router.put('/:collectionId', async (req, res) => {
  const collectionId = req.params.collectionId;
  const { name, description, public } = req.body;

  // TODO replace validation with https://express-validator.github.io
  // TODO accept empty values (it must be possible to reset the name or description to an empty value)
  if (!name && !description && typeof public !== 'boolean') {
    setInvalidPayload(res);
    return;
  }

  try {
    let collection = await getCollection(collectionId);
    if (name) collection.name = name;
    if (description) collection.description = description;
    if (typeof public === 'boolean') collection.public = public;

    collection = await collection.save();
    res.send(transformCollection(req, collection));
  } catch (error) {
    console.error(error);
    setCollectionNotFound(res);
  }
});

///////////////////////
// Utility functions //
///////////////////////

// TODO why are these functions polluting the global scope (overriding functions from the stats routes file)?

// Query functions
getCollection = async (collectionId) => {
  const collection = await Collection.findOne({ collectionId });
  if (!collection) throw Error();
  return collection;
}

transformCollection = (req, collection) => {
  let collectionObj = collection.toObject();
  delete collectionObj.stats;
  collectionObj.url = `${getAPIBaseUrlForCollections(req)}/${collectionObj.collectionId}`;
  collectionObj.uiUrl = `${getUIBaseUrlForCollections(req)}/${collectionObj.collectionId}`;
  collectionObj.statsUrl = `${getAPIBaseUrlForCollections(req)}/${collectionObj.collectionId}/stats`;
  return collectionObj;
}

getAPIBaseUrlForCollections = req => {
  return req.protocol + "://" + req.get('host') + "/api/collections";
}

getUIBaseUrlForCollections = req => {
  return req.protocol + "://localhost:3000/collection"; // TODO get host dynamically
}

// Error setting functions
// TODO https://expressjs.com/en/guide/error-handling.html
setInvalidPayload = (res) => {
  res.status(400).json({ msg: 'invalid payload' });
}

setCollectionNotFound = (res) => {
  res.status(404).json({ msg: 'collection not found' });
}

setUnknownError = (res, msg) => {
  res.status(500).json({ msg });
}

module.exports = router;