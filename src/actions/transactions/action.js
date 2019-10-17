import * as ActionTypes from './constant';
import { BACKEND_URL } from '../../config'
import axios from 'axios'

export const getTransactions = () => async (dispatch) => {
  const res = await axios.get(BACKEND_URL + 'trns')
  let max = 0
  let sum = 0
  for (let i = 0; i < res.data.length; i++) {
    sum += res.data[i][2]
    if (max < res.data[i][2]) {
      max = res.data[i][2]
    }
  }
  dispatch({
    type: ActionTypes.SET_TRANSACTIONS,
    payload: res.data
  })
  dispatch({
    type: ActionTypes.SET_MAX_AMOUNT,
    payload: max
  })
  dispatch({
    type: ActionTypes.SET_SUM_TRANSACTIONS,
    payload: sum
  })
}





