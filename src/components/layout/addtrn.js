import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class AddTrn extends Component {

    render() {
        const { isInvalidAmount, isInvalidName, onChangeCB, handleSubmitCB, name, value, nameAmnt, valueAmnt } = this.props

        let invAmnt = ""
        let dangerMsgAmnt = (<></>)
        if (!(isInvalidAmount === "")) {
            invAmnt = "form-control is-invalid"
            dangerMsgAmnt = (<span className="help-block text-danger"><h6>{isInvalidAmount}</h6></span>)
        } else { invAmnt = "form-control" }

        let invName = ""
        let dangerMsgName = (<></>)
        if (!(isInvalidName === "")) {
            invName = "form-control is-invalid"
            dangerMsgName = (<span className="help-block text-danger"><h6>{isInvalidName}</h6></span>)
        } else { invName = "form-control" }

        const addTransaction = (
            <>
                <Row>
                    <Col sm={{ span: 5, offset: 1 }} md={{ span: 5, offset: 2 }} lg={{ span: 4, offset: 3 }}>
                        <b>TRN name:</b>
                    </Col>
                    <Col sm={{ span: 5, offset: 1 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 0 }}>
                        <b>Amount:</b>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 5, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <div style={{ marginBottom: 5 }} className="input-group">
                            <input type="text" className={invName} name={name} onChange={onChangeCB} value={value} placeholder="shopping" />
                        </div>
                        <div> {dangerMsgName} </div>
                    </Col>
                    <Col sm={{ span: 5, offset: 1 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 0 }}>
                        <div style={{ marginBottom: 5 }} className="input-group">
                            <input type="text" className={invAmnt} name={nameAmnt} onChange={onChangeCB} value={valueAmnt} placeholder="99.99" />
                        </div>
                        <div> {dangerMsgAmnt} </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={{ span: 4, offset: 3 }} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }}>
                        <input type="submit" value="Add transaction" className="btn btn-primary" onClick={handleSubmitCB} />
                    </Col>
                </Row>
            </>
        )

        const forRender = (
            <>
                <Row>
                    <Col sm={{ offset: 1 }}> <h5>Add new transaction in <b>EUR</b>:</h5> </Col>
                </Row>
                <br />
                {addTransaction}
                <br /><br /><br />                
            </>)

        return (<>
            {forRender} </>
        )
    }
}


export default AddTrn

