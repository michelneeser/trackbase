import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

class NameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: ''
    }
  }

  componentDidMount = () => {
    if (this.props.name) {
      this.setState({ value: this.props.name });
    }
  }

  toggleModal = () => {
    this.setState(state => ({ show: !state.show }));
  }

  handleModalValueChange = (event) => {
    this.setState({ value: event.target.value });
  }

  save = (event) => {
    event.preventDefault();
    axios.put(`/api/stats/${this.props.statId}/name`, { value: this.state.value })
      .then(() => {
        this.props.setName(this.state.value);
        this.toggleModal();
      })
      .catch(err => console.error(err));
  }

  render() {
    const nameToShow = (this.props.name ? this.props.name : this.props.statId);

    return (
      <div>
        <div className="mt-3">
          <strong>Name: </strong>
          <span>{nameToShow}</span>
          <StyledBadge className="badge badge-warning ml-2" onClick={this.toggleModal}>edit</StyledBadge>
        </div>

        <Modal show={this.state.show} onHide={this.toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Name your stat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.save}>
              <div class="form-group">
                <p class="text-muted">Give your stat a nice name to identify it in the future</p>
                <input type="text" className="form-control" name="name" placeholder="Name"
                  value={this.state.value} onChange={this.handleModalValueChange} />
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

export default NameModal;