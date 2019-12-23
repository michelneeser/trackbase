import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class Timestamp extends React.Component {
  render() {
    const momentObj = moment(this.props.date);
    const diffToNow = moment().diff(momentObj);

    let shownDate = '';
    let hiddenDate = '';

    if (diffToNow < TWELVE_HOURS_IN_MILLIS) {
      hiddenDate = momentObj.format('L LTS'); // e.g. '12/23/2019 2:37:49 PM'
      shownDate = momentObj.locale('en').fromNow(); // e.g. '10 minutes ago'
    } else {
      shownDate = momentObj.format('L LTS'); // e.g. '12/23/2019 2:37:49 PM'
      hiddenDate = momentObj.locale('en').fromNow(); // e.g. '10 minutes ago'
    }

    return (
      <OverlayTrigger
        placement="right"
        overlay={props => (
          <Tooltip {...props} show={props.show.toString()}>{hiddenDate}</Tooltip>)}>
        <span>{shownDate}</span>
      </OverlayTrigger>
    );
  }
}

const TWELVE_HOURS_IN_MILLIS = 43200000;

Timestamp.propTypes = {
  date: PropTypes.string.isRequired
}

export default Timestamp;