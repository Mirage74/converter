import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "../mainpage.css"

class SumAll extends Component {
    numberWithCommas = (x) => { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
    render() {
        const { currSum, currentRate } = this.props

        let tEur = 0
        let tPln = 0
        if (currSum > 0) {
            tEur = currSum.toFixed(2)
            tPln = (currSum * currentRate).toFixed(2)
        }

        return (
            <>
                <br />
                <Row className = "row-maxsum">
                    <Col sm={{ offset: 1 }}>
                        <b>Sum</b> all transactions: <b>{this.numberWithCommas(tEur)}</b> EUR / <b>{this.numberWithCommas(tPln)}</b> PLN
                    </Col>
                </Row > 
                <br /><br /><br />                
            </>
        )
    }
}
export default SumAll