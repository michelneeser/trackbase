import React from 'react';

class Title extends React.Component {
  render() {
    return (
      <div>
        <h1 className="display-3 text-center mt-3">{this.props.text}</h1>
      </div>
    )
  }
}

export default Title;