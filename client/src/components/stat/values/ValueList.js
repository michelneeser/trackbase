import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Octicon, { Thumbsdown } from '@primer/octicons-react';

class Values extends React.Component {
  deleteValue = (event) => {
    const valueId = event.target.closest('.row').getAttribute('valueid');
    axios.delete(`/api/stats/${this.props.statId}/values/${valueId}`)
      .then(() => this.props.deleteValue(valueId))
      .catch(err => console.error(err));
  }

  render() {
    const values = this.props.values;
    let valuesToRender = '';

    if (values.length > 0) {
      valuesToRender = values.map(value => (
        <div key={value.valueId} valueid={value.valueId} className="row border shadow-sm p-3 mb-3">
          <div className="col-md-4 my-auto">
            {moment(value.created).format('MM/DD/YYYY, hh:mm:ss a')}
          </div>
          <div className="col-md-7 my-auto">
            {value.value}
          </div>
          <div className="col-md-1 my-auto">
            <button type="button" className="btn btn-danger" onClick={this.deleteValue}>X</button>
          </div>
        </div>
      ));
    } else {
      valuesToRender = (
        <div className="row border shadow-sm p-3 mb-3 text-center">
          <div className="col my-5">
            <Octicon icon={Thumbsdown} size="medium" />
            <p className="mt-4">no values yet</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h4 className="mb-4">Values</h4>
        <div>{valuesToRender}</div>
      </div>
    )
  }
}

export default Values;