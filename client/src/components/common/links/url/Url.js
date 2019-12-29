import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class Url extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCopyTooltip: false
    }
    this.copyBadge = React.createRef();
    this.fakeInput = React.createRef();
  }

  copyUrl = () => {
    const input = this.fakeInput.current;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    this.setState({ showCopyTooltip: true });
    setTimeout(() => this.setState({ showCopyTooltip: false }), 1500);
  }

  render() {
    return (
      <div>
        <div className="mt-2">
          <span className="font-weight-bold">{this.props.name}:</span>
          {this.props.showUrl ? (
            <OverlayTrigger
              placement="right"
              overlay={props => (
                <Tooltip {...props} show={props.show.toString()}>{this.props.description}</Tooltip>)}>
              <span> {this.props.url}</span>
            </OverlayTrigger>
          ) : ''}
          <StyledBadge className="badge badge-warning ml-2" onClick={this.copyUrl} ref={this.copyBadge}>copy</StyledBadge>
        </div>

        <StyledInput type="text" value={this.props.url} ref={this.fakeInput} readOnly></StyledInput>

        <Overlay target={this.copyBadge.current} show={this.state.showCopyTooltip} placement="right">
          {props => (
            <Tooltip {...props} show={props.show.toString()}>
              Copied!
            </Tooltip>
          )}
        </Overlay>
      </div>
    )
  }
}

const StyledBadge = styled.span`
  cursor: pointer;
`;

const StyledInput = styled.input`
  position: absolute;
  left: -10000px;
`;

Url.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

Url.defaultProps = {
  showUrl: true
}

export default Url;