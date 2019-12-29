import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalValue: ''
    }
    this.inputField = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.name) {
      this.setState({ modalValue: this.props.name });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.id !== this.props.id) {
      this.setState({ modalValue: this.props.name });
    }
    if (!prevState.showModal && this.inputField.current) {
      this.inputField.current.select();
    }
  }

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  }

  handleModalValueChange = (event) => {
    this.setState({ modalValue: event.target.value });
  }

  save = async (event) => {
    try {
      event.preventDefault();
      const stat = (await axios.put(this.props.updateUrl, { name: this.state.modalValue })).data;
      this.props.setProperty('name', stat.name);
      this.toggleModal();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div className="mt-3">
          <span className="font-weight-bold">Name: </span>
          <span>{this.props.name || this.props.id}</span>
          <StyledBadge className="badge badge-warning ml-2" onClick={this.toggleModal}>edit</StyledBadge>
        </div>

        <Modal show={this.state.showModal} onHide={this.toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Name your stat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.save}>
              <div className="form-group">
                <p className="text-muted">Give your stat a nice name to identify it in the future</p>
                <input type="text" className="form-control" name="name" placeholder="Name" maxLength="30"
                  value={this.state.modalValue} onChange={this.handleModalValueChange} ref={this.inputField} />
              </div>
              <Modal.Footer className="mt-3">
                <button type="submit" className="btn btn-dark">Save</button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const StyledBadge = styled.span`
  cursor: pointer;
`;

Name.propTypes = {
  id: PropTypes.string.isRequired,
  updateUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setProperty: PropTypes.func.isRequired
}

export default Name;