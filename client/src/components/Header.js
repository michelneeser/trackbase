import React from 'react';

import createNewStatAndRedirect from '../utils/history';

import { Button } from 'reactstrap';

class Header extends React.Component {
  render() {
    return (
      <div className="bg-dark py-5">
        <div>
          <h1 className="display-1 text-center text-light">TrackBase</h1>
          <p className="lead text-center text-light">The most simple stats service on the Internet.</p>
        </div>
        <div className="text-center mt-5">
          <Button className="rounded-0" color="info" onClick={createNewStatAndRedirect.bind(this)}>Give me a stats page!</Button>
        </div>
      </div>
    )
  }
}

export default Header;