import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from 'react-global-configuration';
import styled from 'styled-components';
import Octicon, { Graph } from '@primer/octicons-react';
import truncText from 'trunc-text';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import Timestamp from '../common/Timestamp';

class Showroom extends React.Component {
  loading = true;

  constructor(props) {
    super(props);
    this.state = {
      stats: null
    }
  }

  componentDidMount = async () => {
    const stats = (await axios.get(`${config.get('apiBaseUrl')}/stats`)).data;
    this.loading = false;
    this.setState({ stats });
  }

  render() {
    let content;
    if (this.loading) {
      content = (
        <div className="text-center mt-5">
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      const statsToShow = this.state.stats
        .filter(stat => stat.showroom)
        .map(stat => {
          const uiUrl = new URL(stat.uiUrl);
          return (
            <div key={stat.statId} className="col-xl-4 pb-5">
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
          );
        });

      content = (
        <div>
          <Title text="Showroom" />
          <Subtitle text="See what others are tracking" />
          <div className="row">
            {statsToShow}
          </div>
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
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

export default Showroom;