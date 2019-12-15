import React from 'react';

class Subtitle extends React.Component {
  render() {
    return (
      <div>
        <p className="lead text-center mb-4">{this.props.text}</p>
      </div>
    )
  }
}

export default Subtitle;