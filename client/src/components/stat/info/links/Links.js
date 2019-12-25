import React from 'react';
import PropTypes from 'prop-types';

import Url from './Url';

class Links extends React.Component {
  render() {
    return (
      <div className="d-none d-xl-block">
        <Url
          name="Public URL"
          description="Use this URL to publicly show your stat, e.g. for sending to a friend."
          url={this.props.publicUrl} />
        <Url
          name="API"
          description="Use this URL as the entry point to our REST API."
          url={this.props.apiUrl} />
      </div>
    )
  }
}

Links.propTypes = {
  publicUrl: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired
}

export default Links;