import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export const HeaderRadio = () => {
    return  (    
    <Row>
        <Col sm={{ span: 6, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
            <h6>Use NBP ratio</h6>
        </Col>
        <Col sm={{ span: 6, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
            <h6>Use manual ratio</h6>
        </Col>
    </Row>
)
}



