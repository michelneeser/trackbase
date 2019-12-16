import React from 'react';

import Refresh from './Refresh';
import AddValue from './AddValue';

class Controls extends React.Component {
  render() {
    return (
      <div>
        <Refresh statId={this.props.statId} refreshStat={this.props.refreshStat} />
        <AddValue statId={this.props.statId} addValue={this.props.addValue} />
      </div>
    );
  }
}

export default Controls;