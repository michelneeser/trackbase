import React from 'react';

import createNewStatAndRedirect from '../utils/history';

import {
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText
} from 'reactstrap';

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <Row className="mt-5">
          <Col>
            <h1 className="display-1 text-center">Welcome to uStats!</h1>
            <p className="lead text-center">This is the most simple stats service on the Internet.</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md="4" className="mt-3 text-center">
            <Card className="border-dark">
              <CardHeader>Feature 1</CardHeader>
              <CardBody>
                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" className="mt-3 text-center">
            <Card className="border-dark">
              <CardHeader>Feature 2</CardHeader>
              <CardBody>
                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" className="mt-3 text-center">
            <Card className="border-dark">
              <CardHeader>Feature 3</CardHeader>
              <CardBody>
                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="text-center">
            <Button color="info" onClick={createNewStatAndRedirect.bind(this)}>Give me a stats page!</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Welcome;