import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalValue: ''
    }
    this.inputField = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.description) {
      this.setState({ modalValue: this.props.description });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.statId !== this.props.statId) {
      this.setState({ modalValue: this.props.description });
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
      const stat = (await axios.put(this.props.statUrl, { description: this.state.modalValue })).data;
      this.props.setDescription(stat.description);
      this.toggleModal();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div className="mt-2">
          <span className="font-weight-bold">Description: </span>
          <span>{this.props.description || '(nothing here yet)'}</span>
          <StyledBadge className="badge badge-warning ml-2" onClick={this.toggleModal}>edit</StyledBadge>
        </div>

        <Modal show={this.state.showModal} onHide={this.toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Describe your stat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.save}>
              <div className="form-group">
                <p className="text-muted">Give your stat a nice description</p>
                <input type="text" className="form-control" name="description" placeholder="Description" maxLength="100"
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

Description.propTypes = {
  statUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired
}

export default Description;