import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Octicon, { Graph } from '@primer/octicons-react';
import truncText from 'trunc-text';

import Timestamp from '../Timestamp';

class StatCard extends React.Component {
  render() {
    const stat = this.props.stat;
    const uiUrl = new URL(stat.uiUrl);

    return (
      <div className="col-xl-4 pb-5">
        <StyledCard key={stat.statId} className="card shadow">
          <div className="card-header">
            {stat.name || stat.statId}
            {stat.chart ? (
              <StyledOcticon>
                <Octicon icon={Graph} size="small" />
              </StyledOcticon>
            ) : ''}
          </div>
          <div className="card-body">
            <div className="card-text">
              {stat.description ? (
                <p>
                  <span className="font-weight-bold">Description: </span>
                  {truncText(stat.description, 50)}
                </p>
              ) : ''}
              <p>
                <span className="font-weight-bold">Created: </span>
                <Timestamp timestamp={stat.created} />
              </p>
            </div>
            <StyledLink to={uiUrl.pathname} className="btn btn-outline-dark btn-sm">Go to stat</StyledLink>
          </div>
        </StyledCard>
      </div>
    )
  }
}

const StyledCard = styled.div`
  min-height: 15rem;
`;

const StyledOcticon = styled.span`
  position: absolute;
  right: 1rem;
  top: 0.6rem;
`;

const StyledLink = styled(Link)`
  position: absolute;
  bottom: 1.3rem;
`;

StatCard.propTypes = {
  stat: PropTypes.object.isRequired
}

export default StatCard;