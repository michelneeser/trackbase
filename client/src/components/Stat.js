import React from 'react';
import axios from 'axios';

import Title from './Title'

import { Button } from 'reactstrap';

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stat: {},
      reload: false
    }
  }

  componentDidMount = () => {
    this.loadStatData();
  }

  componentDidUpdate = (prevProps) => {
    if (this.state.reload || (prevProps.match.params.statId !== this.props.match.params.statId)) {
      this.loadStatData();
    }
  }

  loadStatData = () => {
    const statId = this.props.match.params.statId;
    axios.get(`/api/stats/${statId}`)
      .then(res => {
        this.setState({ stat: res.data, reload: false });
      })
      .catch(err => {
        // TODO redirect to 404
        console.error(err);
        this.setState({ reload: false });
      });
  }

  reload = () => {
    this.setState({ ...this.state, reload: true });
  }

  render() {
    const values = [];
    if (this.state.stat.statId) {
      this.state.stat.values.forEach(value => {
        values.push(<li key={value.valueId}>{value.value} / {value.created}</li>)
      });
    }

    return (
      <div>
        <Title text="Your stat" />
        <Button color="info" onClick={this.reload}>Reload</Button>
        <h1>{this.state.stat.statId}</h1>
        <ul>
          {values}
        </ul>
      </div>
    );
  }
}

export default Stat;