import axios from 'axios';
import config from 'react-global-configuration';

function createNewStatAndRedirect() {
  axios.post(config.get('apiBaseUrl'))
    .then(res => {
      this.props.history.push("/stat/" + res.data.statId);
    })
    .catch(err => {
      console.error(err);
    });
}

export default createNewStatAndRedirect;