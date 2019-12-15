import React from 'react';

class Title extends React.Component {
  render() {
    return (
      <div>
        <h1 className="display-3 text-center mt-5 mb-4">{this.props.text}</h1>
      </div>
    )
  }
}

export default Title;