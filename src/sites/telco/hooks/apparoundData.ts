import { cpqId } from '@/sites/telco/config'
import { fetchData } from '@/utils/fetcher'
import { initQuote as initQuoteAction } from '@/sites/retail/features/quoteSlice'

export const initQuote = async (dispatch: any) => {
   const response = await fetchData(`/init/cpqId/${cpqId}`, 'get')

   dispatch(initQuoteAction(response))
}
