import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Rates extends Component {

    render() {
        const {editRate, isInvalidRate, editManualRateCB, resetManualRateCB, onChangeCB, name, value, newName, newValue, rateNBP } = this.props
        let manualRateButt
        if (!editRate) {
            manualRateButt = (
                <Col sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <div style={{ marginBottom: 5 }} className="input-group">
                        <input type="text" disabled className="form-control" name={name} onChange={onChangeCB} value={value} placeholder="Manual rate" />
                        <i className="fas fa-pencil-alt"
                            style={{ cursor: 'pointer', color: 'black', marginRight: '1rem' }}
                            onClick={editManualRateCB} />
                    </div>
                </Col>
            )
        } else {
            let invRate = ""
            let dangerMsg = (<></>)
            if (!(isInvalidRate === "")) {
                invRate = "form-control is-invalid"
                dangerMsg = (<span className="help-block text-danger"><h6>{isInvalidRate}</h6></span>)
            } else { invRate = "form-control" }
            manualRateButt = (
                <Col sm={{ span: 5, offset: 1 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <div style={{ marginBottom: 5 }} className="input-group">
                        <input type="text" className={invRate} name={newName} onChange={onChangeCB} value={newValue} placeholder="Manual rate" />
                        <i className="fas fa-check"
                            style={{ cursor: 'pointer', color: 'black', marginRight: '1rem' }}
                            onClick={resetManualRateCB} />
                    </div>
                    <div> {dangerMsg} </div>
                </Col>)
        }
        const rates = (
            <Row>
                <Col sm={{ span: 5, offset: 1 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 1 }}>
                    <div style={{ marginBottom: 5 }} className="input-group">
                        <input type="text" disabled className="form-control" value={rateNBP} />
                    </div>
                </Col >
                {manualRateButt}
            </Row>)

        return (<>
            { rates } </>
        )
    }
}


export default Rates

