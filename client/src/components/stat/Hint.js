import React from 'react'

import { Alert } from 'reactstrap';

class Hint extends React.Component {
  timerId = -1;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidUpdate = () => {
    if (this.props.text !== '' && !this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  }

  dismiss = () => {
    this.props.onDismiss();
    this.setState({ isOpen: false });
  }

  render() {
    if (this.state.isOpen) {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.dismiss();
      }, 5000);
    }

    return (
      <Alert color="warning" isOpen={this.state.isOpen} toggle={this.dismiss} fade={false}>
        {this.props.text}
      </Alert>
    );
  }
}

export default Hint;