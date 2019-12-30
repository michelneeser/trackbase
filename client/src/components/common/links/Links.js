import React from 'react';
import PropTypes from 'prop-types';

import Url from './url/Url';

class Links extends React.Component {
  render() {
    return (
      <div>
        <div className="d-none d-xl-block">
          <Url
            name="Web"
            description="Use this URL to publicly show your stat, e.g. for sending to a friend."
            url={this.props.publicUrl} />
        </div>
        <div className="d-block d-xl-none">
          <Url
            name="Web"
            showUrl={false}
            description="Use this URL to publicly show your stat, e.g. for sending to a friend."
            url={this.props.publicUrl} />
        </div>
        <div className="d-none d-xl-block">
          <Url
            name="API"
            description="Use this URL as the entry point to our REST API."
            url={this.props.apiUrl} />
        </div>
      </div>
    )
  }
}

Links.propTypes = {
  publicUrl: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired
}

export default Links;