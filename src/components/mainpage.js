import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTransactions } from '../actions/transactions/action'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TrnsList from "./layout/trnslist"
import About from "./layout/about"
import {HeaderRadio} from "./layout/headerradio"
import RadioList from "./layout/radiolist"
import Rates from "./layout/rates"
import MaxItem from "./layout/maxitem"
import SumAll from "./layout/sumall"
import AddTrn from "./layout/addtrn"
import PlusMinus from "./layout/plusminus"
import SortBy from "./layout/sortby"
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
        this.setState({ rateNBP: ratePLN, rateManual: ratePLN, rateManualNew: ratePLN, currentRate: ratePLN })
    }

    onPlusMinusClick = e => {
        e.preventDefault()
        this.setState({ expended: !this.state.expended })
    }

    handleChangeRadioCB = (value) => {
        this.setState({ radioButtonSelected: value })
        if (value === "0") { this.setState({ currentRate: this.state.rateNBP }) }
        if (value === "1") { this.setState({ currentRate: this.state.rateManual }) }
    }

    editManualRateCB = () => { this.setState({ editRate: true }) }

    resetManualRateCB = () => {
        const { rateManualNew, rateNBP, radioButtonSelected } = this.state
        let replRate = rateManualNew
        replRate = replRate.replace(",", ".")
        const isNum = (/^\d+\.\d+$/.test(replRate)) || (/^\d+$/.test(replRate))
        const strEr = `Rate must be a number +-${MAX_RATE_DIFF_IN_PROCENT}% from NBP rate`
        if (isNum) {
            let rate = (parseInt(10000 * replRate) / 10000).toFixed(4)
            if ((rate >= (1 - MAX_RATE_DIFF_IN_PROCENT / 100) * rateNBP) && (rate <= (1 + MAX_RATE_DIFF_IN_PROCENT / 100) * rateNBP)) {
                this.setState({ rateManual: rate, rateManualNew: rate, editRate: false, isInvalidRate: "" })
                if (radioButtonSelected === "1") { this.setState({ currentRate: rate }) }
            } else { this.setState({ isInvalidRate: strEr }) }
        } else { this.setState({ isInvalidRate: strEr }) }
    }

    handleSortNameUp = () => { this.setState({ sortBy: 1 }) }
    handleSortNameDown = () => { this.setState({ sortBy: 2 }) }
    handleSortAmntUp = () => { this.setState({ sortBy: 3 }) }
    handleSortAmntDown = () => { this.setState({ sortBy: 4 }) }

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
                "amountEUR": replAmnt
            }
            let res = await this.addTransaction(oneTrn)
            if (typeof res === "string") {
                if (res.substring(0, 5) === "EXIST") { this.setState({ isInvalidName: strErName }) }
            } else { this.setState({ addAmount: "", addTrnName: "", isInvalidAmount: "", isInvalidName: "" }) }
        } else { this.setState({ isInvalidAmount: strErAm }) }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { currTrns, currMax, currSum } = this.props
        const { radioButtonSelected, isInvalidRate, isInvalidAmount, isInvalidName, rateManual, rateManualNew, rateNBP,
            editRate, currentRate, addAmount, addTrnName, sortBy, expended } = this.state
        let leftCol, rightCol

        let aboutInfo
        if (expended) { aboutInfo = (<About />) } else { aboutInfo = (<></>) }

        leftCol = (<> <br />
            <HeaderRadio />
            <RadioList cb={this.handleChangeRadioCB} radioButtonSelected={radioButtonSelected} />
            <Rates editManualRateCB={this.editManualRateCB} resetManualRateCB={this.resetManualRateCB} onChangeCB={this.onChange} editRate={editRate}
                isInvalidRate={isInvalidRate} name="rateManual" value={rateManual} newName="rateManualNew" newValue={rateManualNew} rateNBP={rateNBP} />
            <MaxItem currMax={currMax} currentRate={currentRate}/>
            <SumAll currSum={currSum} currentRate={currentRate}/>
            <AddTrn isInvalidAmount={isInvalidAmount} isInvalidName={isInvalidName} onChangeCB={this.onChange}
                name="addTrnName" value={addTrnName} nameAmnt="addAmount" valueAmnt={addAmount} handleSubmitCB={this.handleSubmit}/>
            <PlusMinus expended={expended} onPlusMinusClick={this.onPlusMinusClick} />
            <Row> {aboutInfo} </Row>
        </>)

        rightCol = (<> <br />
            <SortBy handleSortNameUp={this.handleSortNameUp} handleSortNameDown={this.handleSortNameDown}
                handleSortAmntUp={this.handleSortAmntUp} handleSortAmntDown={this.handleSortAmntDown} sortBy={sortBy}/>
            <TrnsList trns={currTrns} sortBy={sortBy} rate={currentRate} />
        </>)


        return (
            <div>
                <Row>
                    <Col sm={{ span: 5, offset: 1 }} > {leftCol} </Col>
                    <Col sm={{ span: 5, offset: 0 }}> {rightCol} </Col>
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


