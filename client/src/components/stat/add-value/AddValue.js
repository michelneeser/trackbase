import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import Datetime from 'react-datetime';
import Octicon, { Watch, Plus } from '@primer/octicons-react';
import './Datetime.css';

import Notification from '../../common/Notification';

class AddValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      timestamp: moment(),
      isTimestampValid: true,
      success: false
    }
    this.valueField = React.createRef();
    this.timestampField = React.createRef();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.statId !== this.props.statId) {
      this.setState({
        value: '',
        timestamp: moment(),
        isTimestampValid: true,
      });
    }
  }

  handleValueChange = (event) => {
    this.valueField.current.classList.remove('is-invalid');
    this.setState({ value: event.target.value });
  }

  handleTimestampChange = (moment) => {
    this.timestampField.current.classList.remove('is-invalid');
    const stateUpdate = { timestamp: moment };

    if (typeof moment === 'object') {
      // entered timestamp is valid
      stateUpdate.isTimestampValid = true;
    } else {
      // 'moment' is just the input string here
      stateUpdate.isTimestampValid = (moment === ''); // timestamp is valid if empty
    }
    this.setState(stateUpdate);
  }

  setTimestampToCurrent = () => {
    this.setState({ timestamp: moment() });
  }

  addValue = async (event) => {
    try {
      event.preventDefault();
      const { value, timestamp, isTimestampValid } = this.state;

      if (!isTimestampValid) {
        this.timestampField.current.classList.add('is-invalid');
      } else {
        const values = (await axios.post(this.props.valuesUrl, { value, timestamp })).data;
        this.props.setValues(values);
        this.setState({
          value: '',
          timestamp: moment(),
          success: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const notificationText = (this.state.success ? 'Value successfully added' : '');
    const datepickerTimeFormat = (moment.locale() === 'de' ? 'HH:mm:ss' : 'hh:mm:ss A');

    return (
      <div>
        <form className="form mt-5 p-3 border shadow-sm" onSubmit={this.addValue} noValidate>
          <div className="row">
            <div className="col-xl-4">
              <Datetime onChange={this.handleTimestampChange} value={this.state.timestamp} timeFormat={datepickerTimeFormat} renderInput={(props) => (
                <div>
                  <input {...props} ref={this.timestampField} placeholder="enter or choose timestamp" />
                  <div className="invalid-feedback">
                    Please enter a valid timestamp.
                  </div>
                </div>
              )} />
            </div>
            <div className="col-xl-1 mt-4 mt-xl-0">
              <button type="button" className="btn btn-dark btn-block" onClick={this.setTimestampToCurrent}>
                <Octicon icon={Watch} size="small" />
              </button>
            </div>
            <div className="col-xl-5 mt-4 mt-xl-0">
              <input type="text" className="form-control" placeholder="enter value"
                value={this.state.value}
                onChange={this.handleValueChange}
                ref={this.valueField}
                required />
              <div className="invalid-feedback">
                Please enter a value to add.
              </div>
            </div>
            <div className="col-xl-2 mt-4 mt-xl-0">
              <button type="submit" className="btn btn-dark btn-block">
                <Octicon icon={Plus} size="small" />
              </button>
            </div>
          </div>
        </form>

        <Notification text={notificationText} onDismiss={() => this.setState({ success: false })} />
      </div>
    )
  }
}

AddValue.propTypes = {
  statId: PropTypes.string.isRequired,
  valuesUrl: PropTypes.string.isRequired,
  setValues: PropTypes.func.isRequired
}

export default AddValue;