import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Container,
  Button,
  Row,
  Col
} from 'reactstrap';
import NavBar from './components/NavBar';
import Gallery from './components/Gallery';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <NavBar />
          <Container>
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <Row className="mt-5">
                    <Col>
                      <h1>Welcome to uStats!</h1>
                      <p>This is the most simple stats service on the Internet.</p>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col>
                      <Button color="info" block outline>Give me a stats page!</Button>
                    </Col>
                  </Row>
                </React.Fragment>
              )} />
            <Route
              exact
              path="/gallery"
              component={Gallery} />
          </Container>
        </div>
      </Router >
    );
  }
}

export default App;