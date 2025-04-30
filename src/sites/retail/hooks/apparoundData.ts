import { fetchData } from '@/utils/fetcher'
import { config } from '@/sites/retail/config'
import {
   initQuote as initQuoteAction,
   addProduct as addProductAction,
   deleteProduct as deleteProductAction,
   updateQuote,
   updateContract,
} from '@/sites/retail/features/quoteSlice'

export const initQuote = async (dispatch: any) => {
   const response = await fetchData(`/init/cpqId/${config.cpqId}`, 'get')

   dispatch(initQuoteAction(response))
}

export const addProduct = async (
   productGuid: string,
   dispatch: any,
   parentGuid?: string,
   getParentProducts?: boolean
) => {
   const response = await fetchData(`/addProduct/productGuid/${productGuid}/parentGuid/${parentGuid || ''}`, 'get')

   const products = await fetchData(
      `/getProducts/productGuid/${getParentProducts && parentGuid ? parentGuid : productGuid}`,
      'get'
   )

   dispatch(addProductAction({ productGuid, parentGuid, products, ...response }))
}

export const deleteProduct = async (productGuid: string, dispatch: any) => {
   await fetchData(`/removeProduct/productGuid/${productGuid}`, 'delete')

   dispatch(deleteProductAction({ productGuid }))
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
