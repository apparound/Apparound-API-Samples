import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'
import { createCustomer, createCustomerQuote, getCustomer } from '@/sites/utilities/hooks/useCustomer'
import { getStartingProducts, initQuoteSession } from '@/sites/utilities/hooks/useQuote'
import { Product } from '@/interfaces/Product'

const getOrCreateCustomerAndQuote = async () => {
   let customer = JSON.parse(localStorage.getItem('customer'))
   if (!customer) {
      const customers = await getCustomer()
      customer = customers.length > 0 ? customers[0] : await createCustomer().then(data => data.customer)
   }

   let customerQuoteId = localStorage.getItem('customerQuoteId')
   if (!customerQuoteId) {
      customerQuoteId = await createCustomerQuote(customer.id).then(data => data.customerQuoteId)
   }

   return { customer, customerQuoteId }
}

export const initializeCustomer = async (setStartingProductsLoaded: (loaded: boolean) => void) => {
   try {
      const { customer, customerQuoteId } = await getOrCreateCustomerAndQuote()

      if (customer) {
         localStorage.setItem('customerQuoteId', customerQuoteId || '-1')
         localStorage.setItem('customer', JSON.stringify(customer))

         let cpqInfo = JSON.parse(localStorage.getItem('cpqInfo'))
         if (!cpqInfo || 1 == 1) {
            cpqInfo = await initQuoteSession(new ApparoundData().getCPQId(), customer.id)
            localStorage.setItem('cpqInfo', JSON.stringify(cpqInfo))
         }

         let startingProducts: Product[] = []

         if (!localStorage.getItem('startingProducts') && cpqInfo.tofList.length > 0) {
            const tofId = cpqInfo.tofList[0].id
            localStorage.setItem('tofID', tofId)
            startingProducts = await getStartingProducts(new ApparoundData().getCPQId(), tofId)
            localStorage.setItem('startingProducts', JSON.stringify(startingProducts))
            setStartingProductsLoaded(true)
         } else {
            setStartingProductsLoaded(true)
         }
      }
   } catch (error) {
      console.error('Error initializing customer and quote session:', error)
   }
}
