import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class Timestamp extends React.Component {
  render() {
    const momentObj = moment(this.props.timestamp);
    const diffToNow = moment().diff(momentObj);

    let shownValue = '';
    let hiddenValue = '';

    if (diffToNow < TWELVE_HOURS_IN_MILLIS) {
      hiddenValue = momentObj.format('L LTS'); // e.g. '12/23/2019 2:37:49 PM'
      shownValue = momentObj.locale('en').fromNow(); // e.g. '10 minutes ago'
    } else {
      shownValue = momentObj.format('L LTS'); // e.g. '12/23/2019 2:37:49 PM'
      hiddenValue = momentObj.locale('en').fromNow(); // e.g. '10 minutes ago'
    }

    return (
      <OverlayTrigger
        placement="right"
        overlay={props => (
          <Tooltip {...props} show={props.show.toString()}>{hiddenValue}</Tooltip>)}>
        <span>{shownValue}</span>
      </OverlayTrigger>
    );
  }
}

const TWELVE_HOURS_IN_MILLIS = 43200000;

Timestamp.propTypes = {
  timestamp: PropTypes.string.isRequired
}

export default Timestamp;