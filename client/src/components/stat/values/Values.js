import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Octicon, { Trashcan, Reply, Thumbsdown } from '@primer/octicons-react';

import Timestamp from '../../common/Timestamp';

class Values extends React.Component {
  deleteValue = async (event) => {
    try {
      const valueId = event.target.closest('.row').getAttribute('valueid');
      const values = (await axios.delete(`${this.props.valuesUrl}/${valueId}`)).data;
      this.props.setValues(values);
    } catch (error) {
      console.error(error);
    }
  }

  repeatValue = async (event) => {
    try {
      const value = event.target.closest('.row').querySelector('.value').textContent;
      const values = (await axios.post(this.props.valuesUrl, { value })).data;
      this.props.setValues(values);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const values = this.props.values;
    let valuesToRender = '';

    if (values.length > 0) {
      valuesToRender = values.map(value => (
        <div key={value.valueId} valueid={value.valueId} className="row border shadow-sm p-3 mb-3 mx-2 mx-xl-0">
          <div className="col-xl-4 my-auto d-none d-xl-block">
            <Timestamp timestamp={value.timestamp} />
          </div>
          <div className="col-xl-6 mt-4 mt-xl-0 my-xl-auto d-none d-xl-block value">
            {value.value !== '' ? value.value : '[no value]'}
          </div>
          <div className="col-xl-6 mt-4 mt-xl-0 my-xl-auto d-xl-none">
            {value.value} (<Timestamp timestamp={value.timestamp} />)
          </div>
          <div className="col-xl-1 mt-4 mt-xl-0">
            <button type="button" className="btn btn-danger btn-block" onClick={this.deleteValue}>
              <Octicon icon={Trashcan} size="small" />
            </button>
          </div>
          <div className="col-xl-1 mt-4 mt-xl-0">
            <button type="button" className="btn btn-dark btn-block" onClick={this.repeatValue}>
              <Octicon icon={Reply} size="small" />
            </button>
          </div>
        </div>
      ));
    } else {
      valuesToRender = (
        <div className="row border shadow-sm p-3 mb-3 mx-2 mx-xl-0 text-center">
          <div className="col my-5">
            <Octicon icon={Thumbsdown} size="medium" />
            <p className="mt-4">no values yet</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h4 className="mb-4">Values ({this.props.count})</h4>
        <div>{valuesToRender}</div>
      </div>
    )
  }
}

Values.propTypes = {
  valuesUrl: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  setValues: PropTypes.func.isRequired
}

export default Values;