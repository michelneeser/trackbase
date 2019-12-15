import React from 'react';

import createNewStatAndRedirect from '../../utils/history';

class Header extends React.Component {
  render() {
    return (
      <div className="bg-dark py-5">
        <div>
          <h1 className="text-center text-light">Track everything, everywhere</h1>
          <p className="lead text-center text-light">with the most simple stats service on the Internet</p>
        </div>
        <div className="text-center mt-5">
          <button type="button" className="btn btn-info" onClick={createNewStatAndRedirect.bind(this)}>give me a stats page</button>
        </div>
      </div>
    )
  }
}

export default Header;