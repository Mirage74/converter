import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTransactions } from '../../actions/transactions/action'
import axios from 'axios'
import uuid from 'uuid'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BACKEND_URL } from "../../config"
import "../mainpage.css"

class TrnsList extends Component {

    compareNameUp(a, b) {
        if (a[1] < b[1]) {
            return -1
        }
        if (a[1] > b[1]) {
            return 1
        }
        return 0;
    }

    compareNameDown(a, b) {
        if (a[1] < b[1]) {
            return 1
        }
        if (a[1] > b[1]) {
            return -1
        }
        return 0;
    }

    compareAmntUp(a, b) {
        if (a[2] < b[2]) {
            return -1
        }
        if (a[2] > b[2]) {
            return 1
        }
        return 0;
    }

    compareAmntDown(a, b) {
        if (a[2] < b[2]) {
            return 1
        }
        if (a[2] > b[2]) {
            return -1
        }
        return 0;
    }

    onDeleteClick = async (id) => {
        await axios.delete(BACKEND_URL + `del/${id}`)
        this.props.getTransactions()
    }

    render() {
        const { trns, sortBy, rate } = this.props
        let arrSorted = [...trns]
        if (sortBy === 1) { arrSorted = [...arrSorted.sort(this.compareNameUp)] }
        if (sortBy === 2) { arrSorted = [...arrSorted.sort(this.compareNameDown)] }
        if (sortBy === 3) { arrSorted = [...arrSorted.sort(this.compareAmntUp)] }
        if (sortBy === 4) { arrSorted = [...arrSorted.sort(this.compareAmntDown)] }

        let trHeader = (
            <Row>
                <Col sm={{ span: 4, offset: 0 }} >
                    trn name:
                </Col>
                <Col sm={{ span: 3, offset: 0 }} className="text-right" >
                    EUR:
                </Col>
                <Col sm={{ span: 3, offset: 0 }} className="text-right" >
                    PLN:
                </Col>                
            </Row>
        )

        let trnsList = arrSorted.map(item =>
            <Row key={uuid()} className="row-custom">
                <Col sm={{ span: 4, offset: 0 }} >
                    {item[1]}
                </Col>
                <Col sm={{ span: 3, offset: 0 }} className="text-right" >
                    {item[2].toFixed(2)}
                </Col>
                <Col sm={{ span: 3, offset: 0 }} className="text-right" >
                    {(item[2] * rate).toFixed(2)}
                </Col>                
                <Col sm={{ span: 1, offset: 1 }} className="text-right" >
                    <i className="fas fa-times"
                        style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                        onClick={this.onDeleteClick.bind(this, item[0])}
                    />
                </Col>
            </Row>
        )

        let forRender = (
            <>
            <br />
            {trHeader}            
            {trnsList}
            </>
        )

        return (
            <>
                {forRender}
            </>
        )

    }
}


export default connect(null, { getTransactions })(TrnsList)