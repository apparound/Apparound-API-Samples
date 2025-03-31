import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'
import { ProductToCart } from '@/interfaces/ProductToCart'
import { Service } from '@/sites/utilities/components/custom/ServiceSelector'
import { findCurrentProduct } from './productUtils'
import { Product } from '@/interfaces/Product'
import { findParentNodeId, findNodeProperty, findNode } from '@/sites/utilities/hooks/useQuote'
import { calculatePrice } from './priceCalculator'
import { getSelectedProduct, searchTree, updateTree, updateValidProductsAndTree } from '@/utils/treeManager'

const removeProductFromCart = async (basketId: number, nodeId: number) => {
   const node = searchTree('nodeId', nodeId, basketId)
   const apparoundData = new ApparoundData()
   const cpqId = apparoundData.getCPQId()
   const quoteId = apparoundData.getQuoteId()

   if (node) {
      const parentNodeId = findParentNodeId(node.uniqueGuid)

      const quote = await apparoundData
         .removeProductFromCart(cpqId, quoteId, basketId, parentNodeId, nodeId)
         .then(data => data.quote)
      localStorage.setItem('currentQuote', JSON.stringify(quote))
   }
}

const addProductToCart = async (
   apparoundData: ApparoundData,
   basketId: number,
   parentId: number,
   productToCart: ProductToCart
) => {
   const cpqId = apparoundData.getCPQId()
   const quoteId = apparoundData.getQuoteId()

   const quote = await apparoundData
      .addProductToCart(cpqId, quoteId, basketId, parentId, productToCart)
      .then(data => data.quote)
      .catch(error => {
         console.error('Failed to add product to cart:', error)
         return null
      })

   if (quote) {
      localStorage.setItem('currentQuote', JSON.stringify(quote))
   }
}

const fetchAndSetValidProducts = async (basketId: number, offerTypeProductId: number, parentNodeId: number) => {
   const apparoundData = new ApparoundData()
   const cpqId = apparoundData.getCPQId()
   const quoteId = apparoundData.getQuoteId()
   const offerTypeId = apparoundData.getTofId()

   const products = await apparoundData.getValidProducts(
      cpqId,
      offerTypeId,
      quoteId,
      basketId,
      offerTypeProductId,
      parentNodeId
   )
   updateValidProductsAndTree(basketId, products.bottomAxis)
}

const processCurrentProduct = async (
   service: Service,
   basketId: number,
   parentId: number,
   setValidProducts: (products: any[]) => void
) => {
   const currentProduct: Product = await findCurrentProduct(service.productId)
   const parentNode = findNodeProperty('uniqueGuid', service.uniqueId, null, true)
   const parentNodeId = parentNode ? parentNode.nodeId : ''

   if (parentId != 27442) {
      await fetchAndSetValidProducts(basketId, service.tofProductId, parentNodeId)
   } else {
      const price = calculatePrice(service.productId)
      localStorage.setItem('price', JSON.stringify(price / currentProduct.children.length))

      for (const child of currentProduct.children) {
         const quantityData = {
            parentId: findParentNodeId(child.uniqueGuid),
            nodeId: child.nodeId,
            quantity: price,
         }
         const apparoundData = new ApparoundData()
         const cpqId = apparoundData.getCPQId()
         const quoteId = apparoundData.getQuoteId()
         await apparoundData.setProductQuantity(cpqId, quoteId, basketId, quantityData)
      }
   }
}

export const handleSelectService = async (
   service: Service,
   setValidProducts: (products: any[]) => void,
   basketId: number
) => {
   const parentId = service.clusterId
   const productToAddInCart = findNode(service.uniqueId)

   const clusterId = service.clusterId
   const currentSelectedProductId = clusterId ? getSelectedProduct(basketId, clusterId) : null

   if (productToAddInCart != null || currentSelectedProductId != null) {
      const uniqueGuid =
         productToAddInCart != null && productToAddInCart.productId == currentSelectedProductId
            ? productToAddInCart.uniqueGuid
            : searchTree('id', currentSelectedProductId, basketId).uniqueGuid
      const productToRemove = searchTree('uniqueGuid', uniqueGuid, basketId)

      await removeProductFromCart(basketId, productToRemove.nodeId)
      await fetchAndSetValidProducts(basketId, service.tofProductId, null)
   }

   const apparoundData = new ApparoundData()
   const offerTypeId = apparoundData.getTofId()
   const offerTypeProductId = service.tofProductId

   const productToCart: ProductToCart = {
      offerTypeId,
      productId: service.productId,
      offerTypeProductId,
      itemUniqueId: service.uniqueId,
   }

   if (productToAddInCart == null) {
      await addProductToCart(apparoundData, basketId, parentId, productToCart)
      await processCurrentProduct(service, basketId, parentId, setValidProducts)
   }

   updateTree()
}
