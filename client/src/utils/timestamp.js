import moment from 'moment';

const THREE_DAYS_IN_MILLIS = 259200000;

function formatPretty(timestamp) {
  const momentObj = moment(timestamp);
  const diffToNow = moment().diff(momentObj);

  if (diffToNow < THREE_DAYS_IN_MILLIS) {
    return momentObj.locale('en').fromNow(); // e.g. '10 minutes ago'
  } else {
    return momentObj.format('L LTS'); // e.g. '12/23/2019 2:37:49 PM'
  }
}

function format(timestamp) {
  return moment(timestamp).format('L LTS'); // e.g. '12/23/2019 2:37:49 PM'
}

export { formatPretty, format };