import React from 'react';

import Refresh from './Refresh';
import AddValue from './AddValue';

class Controls extends React.Component {
  render() {
    return (
      <div>
        <Refresh refreshStat={this.props.refreshStat} />
        <AddValue statId={this.props.statId} valuesUrl={this.props.valuesUrl} setValues={this.props.setValues} />
      </div>
    );
  }
}

export default Controls;