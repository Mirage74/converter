import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "../mainpage.css"

class MaxItem extends Component {
    numberWithCommas = (x) => { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
    render() {
        const { currMax, currentRate } = this.props
        let tNm = ""
        let tEur = 0
        let tPln = 0
        if (currMax.length > 0) {
            tNm = currMax[1]
            tEur = currMax[0].toFixed(2)
            tPln = (currMax[0] * currentRate).toFixed(2)
        }

        return (
            <>
                <br /> <br /> <br />
                <Row className = "row-maxsum">
                    <Col sm={{ offset: 1 }}>
                        <b>Max</b> transaction: "{tNm}":   <b>{this.numberWithCommas(tEur)}</b> EUR / <b>{this.numberWithCommas(tPln)}</b> PLN
                </Col>
                </Row >
            </>
        )
    }
}
export default MaxItem