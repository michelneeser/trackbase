import React from 'react';
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
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.statId !== this.props.statId) {
      this.setState({ valueToAdd: '' });
    }
  }

  handleAddValueChange = (event) => {
    this.setState({ valueToAdd: event.target.value });
  }

  addValue = (event) => {
    event.preventDefault();
    const value = this.state.valueToAdd;
    axios.post(`/api/stats/${this.props.statId}/values`, { value })
      .then(res => {
        this.props.addValue(res.data[0]);
        this.setState({ valueToAdd: '', success: true });
      })
      .catch(err => console.error(err));
  }

  render() {
    const notificationText = (this.state.success ? 'Value successfully added' : '');

    return (
      <div>
        <form className="form mt-4" onSubmit={this.addValue}>
          <div className="row">
            <div className="col-5">
              <input type="text" className="form-control" placeholder="enter date" aria-describedby="addValue" />
            </div>
            <div className="col-5">
              <input type="text" className="form-control" placeholder="enter value" aria-describedby="addValue"
                value={this.state.valueToAdd}
                onChange={this.handleAddValueChange} />
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

export default AddValue;