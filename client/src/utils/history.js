import axios from 'axios';

function createNewStatAndRedirect() {
  axios.post('/api/stats')
    .then(res => {
      this.props.history.push("/stat/" + res.data.statId);
    })
    .catch(err => {
      console.error(err);
    });
}

export default createNewStatAndRedirect;