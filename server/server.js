const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
app.use(express.json());

// connect to MongoDB
const db = config.get("mongoDB.url");
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log(err));

app.use(cors());

// set up routes
app.use('/api/stats', require('./routes/api/stats'));
app.use('/api/collections', require('./routes/api/collections'));

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`uStats server started on port ${port}`));