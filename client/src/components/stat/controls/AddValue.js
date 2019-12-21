import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Octicon, { Plus } from '@primer/octicons-react';

import Notification from '../Notification';

class AddValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueToAdd: '',
      success: false
    }
    this.valueField = React.createRef();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.statId !== this.props.statId) {
      this.setState({ valueToAdd: '' });
    }
  }

  handleValueChange = (event) => {
    this.setState({ valueToAdd: event.target.value });
  }

  addValue = async (event) => {
    try {
      event.preventDefault();
      const valueToAdd = this.state.valueToAdd;
      if (!valueToAdd) {
        this.valueField.current.classList.add('is-invalid');
      } else {
        const values = (await axios.post(this.props.valuesUrl, { value: valueToAdd })).data;
        this.props.setValues(values);
        this.setState({ valueToAdd: '', success: true });
        this.valueField.current.classList.remove('is-invalid');
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const notificationText = (this.state.success ? 'Value successfully added' : '');

    return (
      <div>
        <form className="form mt-4" onSubmit={this.addValue} noValidate>
          <div className="row">
            <div className="col-5">
              <input type="text" className="form-control" placeholder="enter date" aria-describedby="enterDate" />
            </div>
            <div className="col-5">
              <input type="text" className="form-control" placeholder="enter value" aria-describedby="enterValue"
                value={this.state.valueToAdd}
                onChange={this.handleValueChange}
                ref={this.valueField}
                required />
              <div className="invalid-feedback">
                Please enter a value to add.
              </div>
            </div>
            <div className="col-2">
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