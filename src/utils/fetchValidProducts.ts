import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'
import { getNodeByBasketId, updateTree } from '@/utils/treeManager'

export const fetchValidProducts = async (basketId, setValidProducts) => {
   const apparoundData = new ApparoundData()
   const cpqId = apparoundData.getCPQId()
   const tofID = apparoundData.getTofId()
   const quoteId = apparoundData.getQuoteId()
   const nodeId = getNodeByBasketId(basketId).nodeId

   const products = await apparoundData.getValidProducts(cpqId, tofID, quoteId, basketId, nodeId, null)
   setValidProducts(prevProducts => ({
      ...prevProducts,
      [basketId]: products.bottomAxis,
   }))

   const storedProducts = JSON.parse(localStorage.getItem('validProducts') || '{}')
   storedProducts[basketId] = products.bottomAxis
   localStorage.setItem('validProducts', JSON.stringify(storedProducts))
   updateTree()
}
