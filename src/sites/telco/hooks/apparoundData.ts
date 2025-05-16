import { cpqId } from '@/sites/telco/config'
import { fetchData } from '@/utils/fetcher'
import {
   initQuoteTofsList,
   initQuote as initQuoteAction,
   updateStartingProducts as updateStartingProducts,
} from '@/sites/retail/features/quoteSlice'

export const initQuote = async (dispatch: any) => {
   const response = await fetchData(`/initSession/cpqId/${cpqId}`, 'get')
   dispatch(initQuoteTofsList(response))
}

export const initQuoteWithTof = async (dispatch: any) => {
   const response = await fetchData(`/init/cpqId/${cpqId}`, 'get')

   dispatch(initQuoteAction(response))
}

export const getProductsFromTof = async (dispatch: any, tofId: string) => {
   const response = await fetchData(`/getProducts/tofId/${tofId || ''}/productGuid/`, 'get')

   dispatch(updateStartingProducts(response[0]))
}
