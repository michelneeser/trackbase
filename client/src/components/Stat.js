import React from 'react';
import axios from 'axios';
import Title from './Title'
import { Container } from 'reactstrap';

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statId: ''
    }
  }

  componentDidMount() {
    axios.post('/api/stats')
      .then(res => {
        this.setState({ statId: res.data.statId });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <Title text="Your stat" />
        <h1>{this.state.statId}</h1>
      </div>
    );
  }
}

export default Stat;