import { cpqId } from '@/sites/telco/config'
import { fetchData } from '@/utils/fetcher'
import {
   initQuoteTofsList,
   initQuote as initQuoteAction,
   updateStartingProducts as updateStartingProducts,
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

export const getProductsFromTof = async (dispatch: any, tofId: string) => {
   const response = await fetchData(`/getProducts/tofId/${tofId || ''}/productGuid/`, 'get')
   const payload = response[0]
   dispatch(updateStartingProducts({ ...payload, tofId }))
}

export const addProduct = async (
   productGuid: string,
   dispatch: any,
   tofId: string,
   parentGuid?: string,
   getParentProducts?: boolean
) => {
   const response = await fetchData(
      `/addProduct/tofId/${tofId}/productGuid/${productGuid}/parentGuid/${parentGuid || ''}`,
      'get'
   )

   const products = await fetchData(
      `/getProducts/tofId/${tofId}/productGuid/${getParentProducts && parentGuid ? parentGuid : productGuid}`,
      'get'
   )

   dispatch(addProductAction({ productGuid, parentGuid, products, ...response }))
}
