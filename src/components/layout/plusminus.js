import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class PlusMinus extends Component {
    render() {
        const { expended, onPlusMinusClick } = this.props
        let plusMinus
        if (!expended) {
            plusMinus = (
                <Col md={{ span: 1, offset: 1 }}>
                    <i className="fas fa-plus"
                        style={{ cursor: 'pointer', color: 'green' }}
                        onClick={onPlusMinusClick} />
                </Col>)
        } else {
            plusMinus = (
                <Col md={{ span: 1, offset: 1 }}>
                    <i className="fas fa-minus"
                        style={{ cursor: 'pointer', color: 'green' }}
                        onClick={onPlusMinusClick} />
                </Col>)
        }

        return (
            <Row> {plusMinus} About </Row>
        )
    }
}


export default PlusMinus

