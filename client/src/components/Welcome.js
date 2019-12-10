import React from 'react';

import {
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
        <Row className="mt-3">
          <Col md="4" className="mt-3 text-center">
            <Card className="bg-light border-light rounded-0 shadow">
              <CardHeader>Feature 1</CardHeader>
              <CardBody>
                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" className="mt-3 text-center">
            <Card className="bg-light border-light rounded-0 shadow">
              <CardHeader>Feature 2</CardHeader>
              <CardBody>
                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" className="mt-3 text-center">
            <Card className="bg-light border-light rounded-0 shadow">
              <CardHeader>Feature 3</CardHeader>
              <CardBody>
                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien pellentesque habitant morbi tristique.</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Welcome;