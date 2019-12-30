import React from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import Settings from './settings/Settings';
import About from './about/About';

class Collection extends React.Component {
  loading = true;

  constructor(props) {
    super(props);
    this.state = {
      collection: {}
    }
  }

  componentDidMount = async () => {
    this.loadCollectionData();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.match.params.collectionId !== this.props.match.params.collectionId) {
      this.loadCollectionData();
    }
  }

  loadCollectionData = async () => {
    try {
      const collectionId = this.props.match.params.collectionId;
      const collection = (await axios.get(`${config.get('apiBaseUrl')}/collections/${collectionId}`)).data;
      // stat.values = (await axios.get(stat.valuesUrl)).data;
      this.loading = false;
      this.setState(state => ({ collection }));
    } catch (error) {
      console.error(error);
    }
  }

  setCollectionProperty = (name, value) => {
    this.setState(state => (
      { collection: { ...state.collection, [name]: value } }
    ));
  }

  render() {
    let content;
    if (this.loading) {
      content = (
        <div className="text-center mt-5">
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      const collection = this.state.collection;
      content = (
        <div>
          <Title text={collection.name ? collection.name : 'New Collection'} />
          <Subtitle text="Assemble your stats on a single page &mdash; enjoy!" />

          <hr className="my-5" />
          <div className="row">
            <div className="col-xl-7">
              <About
                collectionId={collection.collectionId}
                collectionUrl={collection.url}
                collectionUiUrl={collection.uiUrl}
                collectionName={collection.name}
                collectionDescription={collection.description}
                setCollectionProperty={this.setCollectionProperty}
                collectionCreated={collection.created} />
            </div>
            <div className="col-xl-5">
              <Settings
                collectionId={collection.collectionId}
                collectionUrl={collection.url}
                public={collection.public}
                setCollectionProperty={this.setCollectionProperty} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Collection;