import React from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

import Title from '../Title';
import Subtitle from '../Subtitle';
import Name from './Name';
import Hint from './Hint';

import { Line } from 'react-chartjs-2';
import {
  Button,
  Alert,
  Badge,
  Row,
  Col,
  Spinner
} from 'reactstrap';

class Stat extends React.Component {
  loading = true;

  constructor(props) {
    super(props);
    this.state = {
      stat: {},
      update: false,
      updatedValues: -1
    }
  }

  componentDidMount = async () => {
    this.loadStatData(false);
  }

  componentDidUpdate = (prevProps) => {
    if (this.state.update || (prevProps.match.params.statId !== this.props.match.params.statId)) {
      this.loadStatData(this.state.update);
    }
  }

  loadStatData = (isUpdate) => {
    const statId = this.props.match.params.statId;
    axios.get(`/api/stats/${statId}`)
      .then(res => {
        const stat = res.data;
        this.loading = false; // TODO better solution with async/await?
        this.setState(state => ({
          stat,
          update: false,
          updatedValues: (isUpdate ? stat.values.length - state.stat.values.length : -1)
        }));
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

  setName = (name) => {
    const stat = this.state.stat;
    stat.name = name;
    this.setState({ stat });
  }

  render() {
    // update hint
    let updateHintText = '';
    if (this.state.updatedValues > -1) {
      const nrOfUpdates = this.state.updatedValues;
      updateHintText = (nrOfUpdates > 0 ? `${nrOfUpdates} new value${nrOfUpdates > 1 ? 's' : ''} added` : 'No updates available');
    }

    let content;
    if (this.loading) {
      content = (
        <div className="text-center mt-5">
          <Spinner color="dark" />
        </div>
      );
    }
    else {
      const stat = this.state.stat;

      // data for chart
      const chartLabels = stat.values.map(value => moment(value.created).format('MM/DD/YYYY, hh:mm:ss a'));
      const chartValues = stat.values.map(value => value.value);

      const chartData = {
        labels: chartLabels,
        datasets: [
          {
            data: chartValues,
            backgroundColor: 'rgba(23, 163, 184, 0.5)'
          }
        ]
      }

      const chartOptions = {
        legend: {
          display: false
        }
      }

      // data for value list
      const listValues = stat.values.map(value => (
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
      ));

      content = (
        <div>
          <Title text={stat.name ? stat.name : 'Your stat'} />
          <Subtitle text="This is your very own stats page - enjoy!" />
          <Hint text={updateHintText} onDismiss={() => this.setState({ updatedValues: -1 })} />
          <Alert color="secondary" className="shadow p-3 mb-4 rounded-0 border-0" fade={false}>
            <h4 className="alert-heading">General Info</h4>
            <Name statId={stat.statId} name={stat.name} setName={this.setName} />
            <div className="mt-2">
              <strong>URL: </strong>
              <span>{window.location.href}</span>
              <StyledBadge color="secondary" className="ml-2 rounded-0">copy</StyledBadge>
            </div>
            <div className="mt-2">
              <strong>Created: </strong>
              <span>{moment(stat.created).format('MMMM Do YYYY, hh:mm:ss a')}</span>
            </div>
          </Alert>
          <Row>
            <Col>
              <Button className="rounded-0" color="dark" block outline onClick={this.update}>Update</Button>
            </Col>
            <Col>
              <Button className="rounded-0" color="danger" block outline>Delete</Button>
            </Col>
          </Row>
          <hr className="mt-5 mb-5" />
          <Line
            data={chartData}
            options={chartOptions} />
          <hr className="mt-5 mb-5" />
          <div>
            <h4 className="alert-heading mb-4">Values</h4>
            <div>{listValues}</div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment >
    );
  }
}

const StyledBadge = styled(Badge)`
  cursor: pointer;
`;

export default Stat;