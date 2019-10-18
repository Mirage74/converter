import {
  getActionType
} from "../utils";

export const prefix = "action.transactions";
export const SET_TRANSACTIONS = getActionType(prefix)("GET_TRANSACTIONS");
export const SET_MAX_AMOUNT = getActionType(prefix)("SET_MAX_AMOUNT");
export const SET_SUM_TRANSACTIONS = getActionType(prefix)("SET_SUM_TRANSACTIONS");







