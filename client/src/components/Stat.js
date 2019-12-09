import React from 'react';
import axios from 'axios';
import moment from 'moment';

import Title from './Title';
import Subtitle from './Subtitle';

import {
  Button,
  Alert,
  Badge,
  Row,
  Col
} from 'reactstrap';

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stat: {},
      update: false,
      alertText: ''
    }
  }

  componentDidMount = () => {
    this.loadStatData(true);
  }

  componentDidUpdate = (prevProps) => {
    if (this.state.update || (prevProps.match.params.statId !== this.props.match.params.statId)) {
      this.loadStatData(!this.state.update);
    }
  }

  loadStatData = (initialLoading) => {
    const statId = this.props.match.params.statId;
    axios.get(`/api/stats/${statId}`)
      .then(res => {
        const data = res.data;
        const updatedState = {
          stat: res.data,
          update: false
        };
        if (!initialLoading) {
          const diff = (data.values.length - this.state.stat.values.length);
          updatedState.alertText = (diff > 0) ? `${diff} new record${diff > 1 ? 's' : ''} added` : 'No updates available';
        }
        this.setState(updatedState);
      })
      .catch(err => {
        // TODO redirect to 404
        console.error(err);
        this.setState({ update: false });
      });
  }

  update = () => {
    this.setState({ update: true });
  }

  dismissAlert = () => {
    this.setState({ alertText: '' })
  }

  render() {
    const values = [];
    if (this.state.stat.statId) {
      this.state.stat.values.forEach(value => {
        values.push(
          <Row key={value.valueId} className="border border-dark shadow-sm p-3 mb-3 bg-light rounded">
            <Col xs="3">
              {moment(value.created).format('MM/DD/YYYY, hh:mm:ss a')}
            </Col>
            <Col xs="8">
              {value.value}
            </Col>
            <Col xs="1">
              <Button color="danger">X</Button>
            </Col>
          </Row>
        );
      });
    }

    if (this.state.alertText !== '') {
      setTimeout(() => this.dismissAlert(), 5000);
    }

    return (
      <div>
        <Title text="Your stat" />
        <Subtitle text="This is your very own stats page - enjoy!" />
        <Alert color="warning" isOpen={this.state.alertText !== ''} toggle={this.dismissAlert} fade={false}>
          {this.state.alertText}
        </Alert>
        <Alert color="info" className="shadow p-3 mb-4 rounded">
          <h4 className="alert-heading">General Info</h4>
          <div className="mt-2">
            <strong>Name: </strong>
            <span>{this.state.stat.statId}</span>
          </div>
          <div className="mt-2">
            <strong>URL: </strong>
            <span>{window.location.href}</span>
            <Badge color="secondary" className="ml-2">copy</Badge>
          </div>
          <div className="mt-2">
            <strong>Created: </strong>
            <span>{moment(this.state.stat.created).format('MMMM Do YYYY, hh:mm:ss a')}</span>
          </div>
        </Alert>
        <Row>
          <Col>
            <Button color="dark" block outline onClick={this.update}>Update</Button>
          </Col>
          <Col>
            <Button color="danger" block outline>Delete</Button>
          </Col>
        </Row>
        <hr className="mt-5 mb-5" />
        <h4 className="alert-heading mb-4">Values</h4>
        {values}
      </div >
    );
  }
}

export default Stat;