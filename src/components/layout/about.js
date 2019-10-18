import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'

class About extends Component {
  render() {
    return (
      <div>
          <br />
          <Row className="justify-content-md-center">
            <h5 className="display-6">Source code Front-End (using React, Redux):</h5>
          </Row>
          <Row className="justify-content-md-center">
            <a href="https://github.com/Mirage74/converter">Front-End on "Github"</a>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-6">Source code Back-End (Koa, MongoDB):</h5>
          </Row>
          <Row className="justify-content-md-center">
            <a href="https://github.com/Mirage74/converter-server">Back-End on "Github"</a>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <h5 className="display-5">By Alex Babrouski</h5>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-5">e-mail:
              <a href="mailto:balexvicx@gmail.com">balexvicx@gmail.com</a>
            </h5>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-5">phone: (+48)733-195-061</h5>
          </Row>
      </div>
    )
  }
}

export default About