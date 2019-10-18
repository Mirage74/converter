import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTransactions } from '../actions/transactions/action'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TrnsList from "./layout/trnslist"
import About from "./layout/about"
import { RadioGroup, Radio } from 'react-radio-group'
import { BACKEND_URL, RATE_PLN_API, MAX_RATE_DIFF_IN_PROCENT } from "../config"
import axios from 'axios'
import "./mainpage.css"

class Mainpage extends Component {
    state = {
        radioButtonSelected: "0",
        rateNBP: 4,
        rateManual: 4,
        rateManualNew: 4,
        editRate: false,
        isInvalidRate: "",
        isInvalidAmount: "",
        isInvalidName: "",
        currentRate: 4,
        addAmount: "",
        addTrnName: "",
        sortBy: 0,
        expended: false
    }

    async componentDidMount() {
        await this.props.getTransactions()
        let ratePLN = await axios.get(RATE_PLN_API)
        ratePLN = ratePLN.data[0].rates.filter(item => item.code === "EUR")[0].mid.toFixed(4)
        this.setState({ rateNBP: ratePLN, rateManual: ratePLN, rateManualNew: ratePLN, currentRate: ratePLN})       
    }

    onPlusMinusClick = e => {
        e.preventDefault()
        this.setState({ expended: !this.state.expended })    }    

    handleChangeRadio = (value) => {
        this.setState({ radioButtonSelected: value })
        if (value === "0") { this.setState({ currentRate: this.state.rateNBP })        }
        if (value === "1") { this.setState({ currentRate: this.state.rateManual })      }
    }

    editManualRate = () => { this.setState({ editRate: true }) }

    resetManualRate = () => {
        const { rateManualNew, rateNBP, radioButtonSelected } = this.state
        let replRate = rateManualNew
        replRate = replRate.replace(",", ".")
        const isNum = (/^\d+\.\d+$/.test(replRate)) || (/^\d+$/.test(replRate))
        const strEr = `Rate must be a number +-${MAX_RATE_DIFF_IN_PROCENT}% from NBP rate`
        if (isNum) {
            let rate = parseInt(10000 * replRate) / 10000
            if ((rate >= (1 - MAX_RATE_DIFF_IN_PROCENT / 100) * rateNBP) && (rate <= (1 + MAX_RATE_DIFF_IN_PROCENT) * rateNBP)) {
                this.setState({ rateManual: replRate, rateManualNew: replRate, editRate: false, isInvalidRate: "" })
                if (radioButtonSelected === "1") {this.setState({ currentRate: replRate })  }
            } else { this.setState({ isInvalidRate: strEr })            }
        } else { this.setState({ isInvalidRate: strEr })        }
    }

    handleSortNameUp = () => {this.setState({sortBy : 1})}
    handleSortNameDown = () => {this.setState({sortBy : 2})}
    handleSortAmntUp = () => {this.setState({sortBy : 3})}
    handleSortAmntDown = () => {this.setState({sortBy : 4})}    

    addTransaction = async (newTransaction) => {
        let res = await axios.post(BACKEND_URL + 'trn', newTransaction)
        .catch(err => { console.log("error creating new trn, Action : ", err) })
        this.props.getTransactions()
        return res.data
    }


    handleSubmit = async (e) => {
        e.preventDefault()
        const { addAmount, addTrnName } = this.state
        let replAmnt = addAmount
        replAmnt = replAmnt.replace(",", ".")
        replAmnt = Math.round(100 * replAmnt) / 100
        let isNum = (/^\d+\.\d+$/.test(replAmnt)) || (/^\d+$/.test(replAmnt))
        if (replAmnt <= 0) { isNum = false }
        const strErAm = "Amount must be a number > 0"
        const strErName = `Transaction with name ${addTrnName} already exist`
        if (isNum) {
            let oneTrn = {
                "transName": addTrnName,
                "amountEUR": addAmount
            }
            let res = await this.addTransaction(oneTrn)
            if (typeof res === "string") {
                if (res.substring(0, 5) === "EXIST") { this.setState({ isInvalidName: strErName })  }
            } else { this.setState({ addAmount: "", addTrnName: "", isInvalidAmount: "", isInvalidName: ""})  }
        } else { this.setState({ isInvalidAmount: strErAm })        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { currTrns, currMax, currSum } = this.props
        const { radioButtonSelected, isInvalidRate, isInvalidAmount, isInvalidName, rateManual, rateManualNew, rateNBP, editRate, currentRate, addAmount, addTrnName, sortBy, expended } = this.state
        let leftCol, rightCol
        const headerRadio = (
            <Row>
                <Col sm={{ span: 6, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <h6>Use NBP ratio</h6>
                </Col>
                <Col sm={{ span: 6, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
                    <h6>Use manual ratio</h6>
                </Col>
            </Row>)

        const radioList = (
            <RadioGroup className="text-left"
                name="listAnswer"
                selectedValue={radioButtonSelected}
                onChange={this.handleChangeRadio}>
                <Row>
                    <Col sm={{ span: 1, offset: 3 }} md={{ span: 1, offset: 2 }} lg={{ span: 1, offset: 2 }}>
                        <label>
                            <Radio value="0" />
                        </label>
                    </Col>
                    <Col sm={{ span: 1, offset: 3 }} md={{ span: 4, offset: 4 }} lg={{ span: 3, offset: 3 }}>
                        <label>
                            <Radio value="1" />
                        </label>
                    </Col>
                </Row>
            </RadioGroup>)

        let manualRateButt

        if (!editRate) {
            manualRateButt = (
                <Col sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <div style={{ marginBottom: 5 }} className="input-group">
                        <input type="text" disabled className="form-control" name="rateManual" onChange={this.onChange} value={rateManual} placeholder="Manual rate" />
                        <i className="fas fa-pencil-alt"
                           style={{ cursor: 'pointer', color: 'black', marginRight: '1rem' }}
                           onClick={this.editManualRate} />
                    </div>
                </Col>
            )
        } else {
            let invRate = ""
            let dangerMsg = (<></>)
            if (!(isInvalidRate === "")) {
                invRate = "form-control is-invalid"
                dangerMsg = ( <span className="help-block text-danger"><h6>{isInvalidRate}</h6></span> )
            } else { invRate = "form-control" }
            manualRateButt = (
                <Col sm={{ span: 5, offset: 1 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <div style={{ marginBottom: 5 }} className="input-group">
                        <input type="text" className={invRate} name="rateManualNew" onChange={this.onChange} value={rateManualNew} placeholder="Manual rate" />
                        <i className="fas fa-check"
                           style={{ cursor: 'pointer', color: 'black', marginRight: '1rem' }}
                           onClick={this.resetManualRate} />
                    </div>
                    <div> {dangerMsg} </div>
                </Col> )
        }
        let rates = (
            <Row>
                <Col sm={{ span: 5, offset: 1 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 1 }}>
                    <div style={{ marginBottom: 5 }} className="input-group">
                        <input type="text" disabled className="form-control" value={rateNBP} />
                    </div>
                </Col >
                {manualRateButt}

            </Row>
        )

        let maxStr = (
            <>
                <br />
                <Row>
                    <Col sm={{ offset: 1 }}>
                        <b>Max</b> transaction: "{currMax[1]}":   <b>{currMax[0].toFixed(2)}</b> EUR / <b>{(currMax[0] * currentRate).toFixed(2)}</b> PLN
                </Col>
                </Row >
            </>
        )

        let sumStr = (
            <>
                <br />
                <Row>
                    <Col sm={{ offset: 1 }}>
                        <b>Sum</b> all transactions: <b>{currSum.toFixed(2)}</b> EUR / <b>{(currSum * currentRate).toFixed(2)}</b> PLN
                    </Col>
                </Row >
            </>
        )

        let invAmnt = ""
        let dangerMsgAmnt = (<></>)
        if (!(isInvalidAmount === "")) {
            invAmnt = "form-control is-invalid"
            dangerMsgAmnt = (
                <span className="help-block text-danger"><h6>{isInvalidAmount}</h6></span>
            )
        } else {
            invAmnt = "form-control"
        }

        let invName = ""
        let dangerMsgName = (<></>)
        if (!(isInvalidName === "")) {
            invName = "form-control is-invalid"
            dangerMsgName = (
                <span className="help-block text-danger"><h6>{isInvalidName}</h6></span>
            )
        } else {
            invName = "form-control"
        }

        let addTransaction = (
            <>
                <Row>
                    <Col sm={{ span: 5, offset: 1 }} md={{ span: 5, offset: 2 }} lg={{ span: 4, offset: 3 }}>
                        <b>TRN name:</b>
                    </Col>
                    <Col sm={{ span: 5, offset: 1 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 1 }}>
                        <b>Amount:</b>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 5, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                        <div style={{ marginBottom: 5 }} className="input-group">
                            <input type="text" className={invName} name="addTrnName" onChange={this.onChange} value={addTrnName} placeholder="shopping" />
                        </div>
                        <div>
                            {dangerMsgName}
                        </div>
                    </Col>
                    <Col sm={{ span: 5, offset: 1 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 1 }}>
                        <div style={{ marginBottom: 5 }} className="input-group">
                            <input type="text" className={invAmnt} name="addAmount" onChange={this.onChange} value={addAmount} placeholder="99.99" />
                        </div>
                        <div>
                            {dangerMsgAmnt}
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={{ span: 4, offset: 3 }} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }}>
                        <input type="submit" value="Add transaction" className="btn btn-primary" onClick={this.handleSubmit} />
                    </Col>
                </Row>
            </>
        )

        let plusMinus
        if (!expended) {
            plusMinus = (
                <Col md={{ span: 1, offset: 1 }}>
                    <i className="fas fa-plus"
                        style={{ cursor: 'pointer', color: 'green' }}
                        onClick={this.onPlusMinusClick}
                    />
                </Col>
            )
        } else {
            plusMinus = (
                <Col md={{ span: 1, offset: 1 }}>
                    <i className="fas fa-minus"
                        style={{ cursor: 'pointer', color: 'green' }}
                        onClick={this.onPlusMinusClick}
                    />
                </Col>
            )
        }

        let aboutInfo
        if (expended) { aboutInfo = (<About />)} else {aboutInfo = (<></>)}

        leftCol = (
            <>
                <br />
                {headerRadio}
                {radioList}
                {rates}
                <br /><br />
                {maxStr}
                {sumStr}
                <br /><br /><br />
                <Row>
                    <Col sm={{ offset: 1 }}>
                        <h5>Add new transaction in <b>EUR</b>:</h5>
                    </Col>
                </Row>
                <br />
                {addTransaction}
                <br /><br /><br />
                <Row>
                    {plusMinus} About
                </Row>
                <Row>
                    {aboutInfo}
                </Row>

            </>
        )

        let sortNameUp = (
            <i className="fas fa-arrow-up"
            style={{ cursor: 'pointer', color: 'black', marginLeft: '1rem' }}
            onClick={this.handleSortNameUp} />
        )    
        let sortNameDown = (        
            <i className="fas fa-arrow-down"
            style={{ cursor: 'pointer', color: 'black'}}
            onClick={this.handleSortNameDown} />
        )
        let sortAmntUp = (        
            <i className="fas fa-arrow-up"
            style={{ cursor: 'pointer', color: 'black', marginLeft: '1rem' }}
            onClick={this.handleSortAmntUp} />
        )
        let sortAmntDown = (        
            <i className="fas fa-arrow-down"
            style={{ cursor: 'pointer', color: 'black'}}
            onClick={this.handleSortAmntDown} />
        )                                  

        if (sortBy === 1) {sortNameUp = (<></>)}
        if (sortBy === 2) {sortNameDown = (<></>)}
        if (sortBy === 3) {sortAmntUp = (<></>)}
        if (sortBy === 4) {sortAmntDown = (<></>)}
        rightCol = (
            <>
                <br />
                <Row>
                    <Col sm={{ span: 5, offset: 1 }}>
                        Sort by <b>name</b>: 
                        {sortNameUp}
                        {sortNameDown}
                    </Col>
                    <Col sm={{ span: 6, offset: 0 }}>
                        Sort by <b>amount</b>: 
                        {sortAmntUp}
                        {sortAmntDown}
                    </Col>                    
                </Row>
                <TrnsList trns = {currTrns} sortBy = {sortBy}/>
            </>
        )

        return (
            <div>
                <Row>
                    <Col sm={{ span: 5, offset: 1 }} >
                        {leftCol}
                    </Col>
                    <Col sm={{ span: 5, offset: 0 }}>
                        {rightCol}
                    </Col>
                </Row>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    currTrns: state.transactions.currTransactions,
    currMax: state.transactions.currMax,
    currSum: state.transactions.currSum
})

export default connect(mapStateToProps, { getTransactions })(Mainpage)


