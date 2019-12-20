import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalValue: ''
    }
  }

  componentDidMount = () => {
    if (this.props.name) {
      this.setState({ modalValue: this.props.name });
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.statId !== this.props.statId) {
      this.setState({ modalValue: '' });
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
      const stat = (await axios.put(`${this.props.statUrl}/name`, { value: this.state.modalValue })).data;
      this.props.setName(stat.name);
      this.toggleModal();
    } catch (error) {
      console.log(error);
    }
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

        <Modal show={this.state.showModal} onHide={this.toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Name your stat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.save}>
              <div className="form-group">
                <p className="text-muted">Give your stat a nice name to identify it in the future</p>
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

export default Name;