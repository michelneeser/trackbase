import axios from 'axios';
import config from 'react-global-configuration';

function createNewStatAndRedirect() {
  axios.post(`${config.get('apiBaseUrl')}/stats`)
    .then(res => {
      this.props.history.push("/stat/" + res.data.statId);
    })
    .catch(err => {
      console.error(err);
    });
}

function createNewCollectionAndRedirect() {
  axios.post(`${config.get('apiBaseUrl')}/collections`)
    .then(res => {
      this.props.history.push("/collection/" + res.data.collectionId);
    })
    .catch(err => {
      console.error(err);
    });
}

export { createNewStatAndRedirect, createNewCollectionAndRedirect };