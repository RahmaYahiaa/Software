//  REACT BOOTSTRAB
import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="text-center bg-light">
      <Container className="pt-4">
        <Row className="mb-4">
          <Col>
            <Button variant="link" size="lg" className="text-dark m-1" href="#!" role="button">
              <i className="fab fa-facebook-f"></i>
            </Button>

            <Button variant="link" size="lg" className="text-dark m-1" href="#!" role="button">
              <i className="fab fa-twitter"></i>
            </Button>

            <Button variant="link" size="lg" className="text-dark m-1" href="#!" role="button">
              <i className="fab fa-google"></i>
            </Button>

            <Button variant="link" size="lg" className="text-dark m-1" href="#!" role="button">
              <i className="fab fa-instagram"></i>
            </Button>

            <Button variant="link" size="lg" className="text-dark m-1" href="#!" role="button">
              <i className="fab fa-linkedin"></i>
            </Button>

            <Button variant="link" size="lg" className="text-dark m-1" href="#!" role="button">
              <i className="fab fa-github"></i>
            </Button>
          </Col>
        </Row>
      </Container>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2020 Copyright:
        <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>
  );
}
