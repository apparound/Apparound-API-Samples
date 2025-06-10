import { cpqId } from '@/sites/telco/config'
import { fetchData } from '@/utils/fetcher'
import {
   initQuoteTofsList,
   initQuote as initQuoteAction,
   updateStartingProducts as updateStartingProducts,
   addProduct as addProductAction,
   deleteProduct as deleteProductAction,
   setProductQuantityReducer as setProductQuantityAction,
   updateQuote,
   updateContract,
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

export const deleteProduct = async (productGuid: string, dispatch: any) => {
   await fetchData(`/removeProduct/productGuid/${productGuid}`, 'delete')

   dispatch(deleteProductAction({ productGuid }))
}

export const setProductQuantity = async (productGuid: string, quantity: number, dispatch: any) => {
   await fetchData(`/setProductQuantity/productGuid/${productGuid}/qty/${quantity}`, 'post')

   dispatch(setProductQuantityAction({ productGuid, quantity }))
}

export const updateCustomerQuote = async (customer, dispatch) => {
   await fetchData('/updateCustomerQuote', 'post', {
      customer: {
         ...customer,
         properties: {
            ...customer,
         },
      },
   })
}

export const saveContract = async (contract, customer, dispatch) => {
   await fetchData('/updateCustomerQuote', 'post', {
      customer: {
         ...customer,
         properties: {
            ...customer,
         },
      },
   })

   const quote = await fetchData('/finalizeQuote', 'post')

   dispatch(updateQuote(quote.quote))

   const currentContract = await fetchData('/saveContract', 'post', { contract })

   dispatch(updateContract(currentContract.contract))
}

export const getPdfQuote = async (sessionId: string) => {
   const response = await fetchData(`/getPdfQuote`, 'get', {
      headers: {
         'x-sessionid': sessionId,
      },
   })
   if (!response.ok) throw new Error('Errore nel recupero del PDF')
   const blob = await response.blob()
   return blob
}

export const SERVER_URL: string = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : ''

export const getPdfUrl = async (sessionId: string) => {
   return `${SERVER_URL}/getPdfQuote?sessionId=${sessionId}`
}
