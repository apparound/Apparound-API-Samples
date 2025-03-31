import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'
import { getAllMainProductsIds, getCartIdFromMainProductId, updateTree } from '@/utils/treeManager'
import { Service } from '@/sites/utilities/components/custom/ServiceSelector'
import { mainServicesId } from '@/sites/utilities/utils/constants'

export const handleSelectMainService = async (
   service: Service,
   setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>,
   setShowErrorToast: React.Dispatch<React.SetStateAction<boolean>>
): Promise<number[]> => {
   const apparoundData = new ApparoundData()
   const customerId = apparoundData.getCustomerId()
   const customerQuoteId = apparoundData.getCustomerQuoteId()

   const cartData = {
      productId: service.productId,
      tofProductId: service.tofProductId,
      customerId: customerId,
      customerQuoteId: customerQuoteId,
   }

   let quote = localStorage.getItem('currentQuote')
   let quoteId = -1

   if (quote) {
      const quoteJson = JSON.parse(quote)
      quoteId = quoteJson.quoteId
   }

   let mainProductsIds = getAllMainProductsIds()

   if (mainProductsIds.length && mainProductsIds.includes(service.productId)) {
      const basketId = getCartIdFromMainProductId(service.productId)

      quote = await apparoundData.deleteCartById(basketId).then(data => data.quote)
   } else {
      quote = await apparoundData.createCartWithCartData(cartData).then(data => data.quote)
   }

   if (quote) {
      localStorage.setItem('currentQuote', JSON.stringify(quote))
      updateTree()

      let updatedServices: number[] = []
      if (mainProductsIds.length && mainProductsIds.includes(service.productId)) {
         updatedServices = mainProductsIds.filter(id => id !== service.productId)
      } else {
         updatedServices = [...mainProductsIds, service.productId]
      }

      return updatedServices as number[]
   } else {
      setShowErrorToast(true)
      return []
   }
}
