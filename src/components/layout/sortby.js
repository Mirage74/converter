import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class SortBy extends Component {
    render() {
        const { handleSortNameUp, handleSortNameDown, handleSortAmntUp, handleSortAmntDown, sortBy } = this.props

        let sortNameUp = (
            <i className="fas fa-arrow-up"
                style={{ cursor: 'pointer', color: 'black', marginLeft: '1rem' }}
                onClick={handleSortNameUp} />
        )
        let sortNameDown = (
            <i className="fas fa-arrow-down"
                style={{ cursor: 'pointer', color: 'black' }}
                onClick={handleSortNameDown} />
        )
        let sortAmntUp = (
            <i className="fas fa-arrow-up"
                style={{ cursor: 'pointer', color: 'black', marginLeft: '1rem' }}
                onClick={handleSortAmntUp} />
        )
        let sortAmntDown = (
            <i className="fas fa-arrow-down"
                style={{ cursor: 'pointer', color: 'black' }}
                onClick={handleSortAmntDown} />
        )

        if (sortBy === 1) { sortNameUp = (<></>) }
        if (sortBy === 2) { sortNameDown = (<></>) }
        if (sortBy === 3) { sortAmntUp = (<></>) }
        if (sortBy === 4) { sortAmntDown = (<></>) }        


        return (
            <Row>
                <Col sm={{ span: 5, offset: 2 }}>
                    Sort by <b>name</b>:
                        {sortNameUp}
                        {sortNameDown}
                </Col>
                <Col sm={{ span: 5, offset: 0 }}>
                    Sort by <b>amount</b>:
                        {sortAmntUp}
                        {sortAmntDown}
                </Col>
            </Row>
        )
    }
}


export default SortBy

