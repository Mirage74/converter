import { combineReducers } from 'redux';
import { TransactionsTypes } from '../../actions';

const INITIAL_STATE = {
  transactions: [],
  max: [0, 0],
  sum: 0
}

const currTransactions = (state = INITIAL_STATE.transactions, { type, payload }) => {
  switch (type) {
    case TransactionsTypes.SET_TRANSACTIONS:
      return payload;
    default:
      return state;
  }
}

const currMax = (state = INITIAL_STATE.max, { type, payload }) => {
  switch (type) {
    case TransactionsTypes.SET_MAX_AMOUNT:
      return payload;
    default:
      return state;
  }
}

const currSum = (state = INITIAL_STATE.sum, { type, payload }) => {
  switch (type) {
    case TransactionsTypes.SET_SUM_TRANSACTIONS:
      return payload;
    default:
      return state;
  }
}

export default combineReducers({
  currTransactions,
  currMax,
  currSum
})

