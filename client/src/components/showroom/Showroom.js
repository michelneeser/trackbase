import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from 'react-global-configuration';
import styled from 'styled-components';
import Octicon, { Graph } from '@primer/octicons-react';

import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import Timestamp from '../stat/Timestamp';

class Showroom extends React.Component {
  loading = true;

  constructor(props) {
    super(props);
    this.state = {
      stats: null
    }
  }

  componentDidMount = async () => {
    const stats = (await axios.get(config.get('apiBaseUrl'))).data;
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
      const statsToShow = this.state.stats.map(stat => {
        const uiUrl = new URL(stat.uiUrl);
        return (
          <div key={stat.statId} className="col-xl-4 pb-5">
            <div key={stat.statId} className="card shadow">
              <div className="card-header">
                {stat.name || stat.statId}
                {stat.withChart ? (
                  <StyledOcticon>
                    <Octicon icon={Graph} size="small" />
                  </StyledOcticon>
                ) : ''}
              </div>
              <div className="card-body">
                <div className="card-text">
                  Created: <Timestamp timestamp={stat.created} />
                </div>
                <Link to={uiUrl.pathname} className="btn btn-outline-dark btn-sm mt-3">Go to stat</Link>
              </div>
            </div>
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

const StyledOcticon = styled.span`
  position: absolute;
  right: 1rem;
  top: 0.6rem;
`;

export default Showroom;