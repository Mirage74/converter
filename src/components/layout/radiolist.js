import React, { Component } from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class RadioList extends Component {
    render() {
        const{ cb, radioButtonSelected } = this.props
        const rList = (
            <RadioGroup className="text-left"
                name="listAnswer"
                selectedValue={radioButtonSelected}
                onChange={cb}>
                <Row>
                    <Col sm={{ span: 1, offset: 3 }} md={{ span: 1, offset: 2 }} lg={{ span: 1, offset: 2 }}>
                        <label> <Radio value="0" /> </label>
                    </Col>
                    <Col sm={{ span: 1, offset: 3 }} md={{ span: 4, offset: 4 }} lg={{ span: 3, offset: 3 }}>
                        <label> <Radio value="1" /> </label>
                    </Col>
                </Row>
            </RadioGroup>
            )

        return (<>
            { rList } </>
        )
    }
}


export default RadioList

