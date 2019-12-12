import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {
  Button,
  Badge,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class NameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      value: ''
    }
  }

  componentDidMount = () => {
    if (this.props.name) {
      this.setState({ value: this.props.name });
    }
  }

  toggleNameModal = () => {
    this.setState(state => ({ display: !state.display }));
  }

  handleNameModalValueChange = (event) => {
    this.setState({ value: event.target.value });
  }

  saveName = (event) => {
    event.preventDefault();
    axios.put(`/api/stats/${this.props.statId}/name`, { value: this.state.value })
      .then(() => {
        this.props.setName(this.state.value);
        this.toggleNameModal()
      })
      .catch(err => console.error(err));
  }

  render() {
    const nameToDisplay = (this.props.name ? this.props.name : this.props.statId);

    return (
      <div>
        <div className="mt-2">
          <strong>Name: </strong>
          <span>{nameToDisplay}</span>
          <StyledBadge color="secondary" className="ml-2 rounded-0" onClick={this.toggleNameModal}>edit</StyledBadge>
        </div>

        <Modal isOpen={this.state.display} toggle={this.toggleNameModal}>
          <ModalHeader toggle={this.toggleNameModal}>Name your stat</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.saveName}>
              <Input type="text" name="name" className="rounded-0" placeholder="Name" aria-describedby="nameHelp"
                value={this.state.value} onChange={this.handleNameModalValueChange} />
              <small id="nameHelp" className="form-text text-muted">Give your stat a nice name to identify it in the future!</small>
              <ModalFooter className="mt-3">
                <Button type="submit" className="rounded-0" color="dark">Save</Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const StyledBadge = styled(Badge)`
  cursor: pointer;
`;

export default NameModal;