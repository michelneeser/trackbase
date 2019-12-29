import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  deleteStat = async () => {
    try {
      await axios.delete(this.props.statUrl);
      window.location.href = "/"; // TODO find better solution
    } catch (error) {
      console.error(error);
    }
  }

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-danger btn-block" onClick={this.toggleModal}>delete stat</button>

        <Modal show={this.state.showModal} onHide={this.toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Really delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Do you really want to delete this stat?<br />Please be sure &mdash; this action cannot be undone!</div>
            <Modal.Footer className="mt-3">
              <button type="button" className="btn btn-danger" onClick={this.deleteStat}>Yes</button>
              <button type="button" className="btn btn-dark" onClick={() => this.setState({ showModal: false })}>No</button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

Delete.propTypes = {
  statUrl: PropTypes.string.isRequired
}

export default Delete;