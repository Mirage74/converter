import React, { Component } from 'react'
import uuid from 'uuid'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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


    render() {
        const { trns, sortBy } = this.props
        let arrSorted = [...trns]
        if (sortBy === 1) { arrSorted = [...arrSorted.sort(this.compareNameUp)] }
        if (sortBy === 2) { arrSorted = [...arrSorted.sort(this.compareNameDown)] }
        if (sortBy === 3) { arrSorted = [...arrSorted.sort(this.compareAmntUp)] }
        if (sortBy === 4) { arrSorted = [...arrSorted.sort(this.compareAmntDown)] }

        let forRender = arrSorted.map(item =>
            <Row key={uuid()} className = "row-custom">
                <Col sm={{ span: 5, offset: 1 }} >
                    {item[1]}
                </Col>
                <Col sm={{ span: 3, offset: 0 }} className="text-right" >
                    {item[2].toFixed(2)}
                </Col>
            </Row>
        )

        return (
            <>
                {forRender}
            </>
        )

    }
}


export default TrnsList

