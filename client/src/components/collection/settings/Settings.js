import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      public: props.public
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.collectionId !== this.props.collectionId) {
      this.setState({
        public: this.props.public
      });
    }
  }

  handleInputChange = async (event) => {
    const fieldName = event.target.id;

    try {
      const collection = (await axios.put(this.props.collectionUrl, { [fieldName]: event.target.checked })).data;
      this.props.setCollectionProperty(fieldName, collection[fieldName]);
      this.setState({ [fieldName]: collection[fieldName] });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <StyledWrapper className="border shadow-sm mt-5 mt-xl-0 p-4">
        <h4 className="alert-heading">Settings</h4>
        <hr />

        {/* publicly accessible */}
        <OverlayTrigger
          placement="right"
          overlay={props => (
            <Tooltip {...props} show={props.show.toString()}>if active, anyone is allowed to access this collection if the exact URL is known</Tooltip>)}>
          <div className="custom-control custom-switch mt-2">
            <input type="checkbox" className="custom-control-input" id="public"
              checked={this.state.public}
              onChange={this.handleInputChange} />
            <label className="custom-control-label" htmlFor="public">publicly accessible</label>
          </div>
        </OverlayTrigger>
      </StyledWrapper >
    )
  }
}

const StyledWrapper = styled.div`
  background-color: #fafafa;

  @media(min-width: 1200px) {
    height: 18rem;
  }
`;

Settings.propTypes = {
  collectionId: PropTypes.string.isRequired,
  collectionUrl: PropTypes.string.isRequired,
  public: PropTypes.bool.isRequired,
  setCollectionProperty: PropTypes.func.isRequired
}

export default Settings;