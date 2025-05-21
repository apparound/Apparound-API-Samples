import { RootState } from './store'

export const selectTelcoTree = (state: RootState) => state.quote.tree
export const selectTelcoCart = (state: RootState) => state.quote.cart || {}
export const selectTelcoIsValid = (state: RootState) => state.quote.isValid
export const selectTelcoCustomer = (state: RootState) => state.quote.customer
export const selectTelcoContract = (state: RootState) => state.quote.contract
export const selectTelcoQuote = (state: RootState) => state.quote.quote
