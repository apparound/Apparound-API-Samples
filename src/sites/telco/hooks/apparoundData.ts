import { cpqId } from '@/sites/telco/config'
import { fetchData } from '@/utils/fetcher'
import {
   initQuoteTofsList,
   initQuote as initQuoteAction,
   addProduct as addProductAction,
} from '@/sites/retail/features/quoteSlice'

export const initQuote = async (dispatch: any) => {
   const response = await fetchData(`/initSession/cpqId/${cpqId}`, 'get')
   dispatch(initQuoteTofsList(response))
}

export const initQuoteWithTof = async (dispatch: any) => {
   const response = await fetchData(`/init/cpqId/${cpqId}`, 'get')

   dispatch(initQuoteAction(response))
}

export const getProductsFromTof = async (tofId: string) => {
   const products = await fetchData(`/getProducts/tofId/${tofId || ''}/productGuid/`, 'get')
}
