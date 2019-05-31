import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFoundPage = props => {
  return (
    <Container className="pt-5">
      <Row>
        <Col className="text-center">
          <h1>Not Found</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
