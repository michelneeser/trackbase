import React from 'react';
import Octicon, { Plus } from '@primer/octicons-react';

class AddStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  addValue = () => {
    // TODO
  }

  handleValueChange = () => {
    // TODO
  }

  render() {
    return (
      <div>
        <form className="form mt-5 p-3 border shadow-sm" onSubmit={this.addValue} noValidate>
          <div className="row">
            <div className="col-xl-9">
              <input type="text" className="form-control" placeholder="enter stat id"
                onChange={this.handleValueChange}
                value={this.state.value} />
              <div className="invalid-feedback">
                Please enter a value to add.
              </div>
            </div>
            <div className="col-xl-3 mt-4 mt-xl-0">
              <button type="submit" className="btn btn-dark btn-block">
                <Octicon icon={Plus} size="small" />
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AddStat;