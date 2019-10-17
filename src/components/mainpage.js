import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTransactions } from '../actions/transactions/action'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { RadioGroup, Radio } from 'react-radio-group'
import { BACKEND_URL, RATE_PLN_API } from "../config"
import axios from 'axios'
import "./mainpage.css"

class Mainpage extends Component {
    state = {
        radioButtonSelected: "0",
        rateNBP: 4,
        rateManual: 4,
        editRate: false,
        isInvalidRate: "",
        isInvalidNum: false
    }

    async componentDidMount() {
        await this.props.getTransactions()
        let ratePLN = await axios.get(RATE_PLN_API)
        ratePLN = ratePLN.data[0].rates.filter(item => item.code === "EUR")[0].mid
        this.setState({ rateNBP: ratePLN })
        this.setState({ rateManual: ratePLN })
    }

    addTransaction = async (newTransaction) => {
        await axios.post(BACKEND_URL + 'trn', newTransaction)
            .catch(err => {
                console.log("error creating new trn, Action : ", err)
            })
        this.getTransactions()

    }

    handleChangeRadio = (value) => {
        this.setState({ radioButtonSelected: value })
    }

    editManualRate = () => {
        this.setState({ editRate: true })
    }

    resetManualRate = () => {
        const { rateManual, rateNBP } = this.state
        let replRate = rateManual.replace(",", ".")
        const isNum = /^\d+\.\d+$/.test(replRate)
        const strEr = "Rate must be number +-10% from NBP rate"
        if (isNum) {
            let rate = parseInt(10000 * replRate) / 10000
            if ( (rate >= 0.9 * rateNBP) && (rate <= 1.1 * rateNBP) ) {
                this.setState({ rateManual: rate })
                this.setState({ editRate: false })
            } else {
                this.setState({isInvalidRate: strEr})    
            }
        } else {
            this.setState({isInvalidRate: strEr})
        }
    }


    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { currTrns, currMax, currSum } = this.props
        const { radioButtonSelected, isInvalidRate, rateManual, rateNBP, editRate } = this.state
        let leftCol, rightCol


        const headerRadio = (
            <Row>
            <Col sm={{ span: 6, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                <h6>use NBP ratio</h6>
            </Col>
            <Col sm={{ span: 6, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 1 }}>
                <h6>use manual ratio</h6>
            </Col>
        </Row>            
        )


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
            </RadioGroup>
        )


        let manualRateButt

        if (!editRate) {
            manualRateButt = (
                <Col sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <div style={{ marginBottom: 5 }} className="input-group">
                        <input type="text" disabled className="form-control" name="rateManual" onChange={this.onChange} value={rateManual} placeholder="Manual rate" />
                        <i
                            className="fas fa-pencil-alt"
                            style={{ cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem' }}
                            onClick={this.editManualRate}
                        />
                    </div>
                </Col >
            )
        } else {
            let invRate = ""
            let dangerMsg = (<></>)
            if (!(isInvalidRate === "")) {
                invRate = "form-control is-invalid"
                dangerMsg = (
                    <span className="help-block text-danger"><h6>{isInvalidRate}</h6></span>
                )
            } else {
                console.log("no")
                invRate = "form-control"
            }
            manualRateButt = (

                <Col sm={{ span: 5, offset: 1 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <div style={{ marginBottom: 5 }} className="input-group">
                        <input type="text" className={invRate} name="rateManual" onChange={this.onChange} value={rateManual} placeholder="Manual rate" />
                        <i
                            className="fas fa-check"
                            style={{ cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem' }}
                            onClick={this.resetManualRate}
                        />
                    </div>
                    <div>
                        {dangerMsg}
                    </div>

                </Col>
            )
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



        leftCol = (
            <>
                {headerRadio}
                {radioList}
                {rates}

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


