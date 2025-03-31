import { Product } from '../interfaces/Product'
import { Cart, Cluster } from '../interfaces/Cart'
import { findNodeProperty } from '@/sites/utilities/hooks/useQuote'
import { ApparoundData } from '@/sites/utilities/hooks/use-apparound-data'
import { CUSTOMER_DATA } from '@/sites/utilities/hooks/useCustomer'

const apparoundData: any = new ApparoundData()

const mapChildren = (children: Product[], clusters: any[]): any[] => {
   return (
      children.map(child => {
         const clusterNode = findNodeProperty(
            'offerTypeProductId',
            child.offerTypeProductId.toString(),
            null,
            true,
            clusters
         )

         const childObject = {
            label: child.productName,
            price: child.netRecurringPriceWithVatAmount,
            oneOffPriceAmount: child.oneOffPriceWithVatAmount,
            quantity: child.quantity,
            id: child.productId,
            tofProductId: child.offerTypeProductId,
            uniqueGuid: child.uniqueGuid,
            nodeId: child.nodeId,
            clusterId: clusterNode ? clusterNode.id : '',
            clusterName: clusterNode ? clusterNode.name : '',
            children: child.children ? mapChildren(child.children as Product[], clusters) : [],
         }

         return childObject
      }) || []
   )
}

const mapClusterProducts = (clusters: any[], itemsInCart: Product[]): Cluster[] => {
   return clusters
      .filter(cluster => cluster.id !== 27441 && cluster.productsTOF && cluster.productsTOF.length > 0)
      .map(cluster => {
         const productIds = (cluster.productsTOF || []).map((product: any) => product.productId)
         const filteredProducts = itemsInCart.filter(product => productIds.includes(product.productId))
         if (filteredProducts.length === 0) return null

         return {
            clusterId: cluster.id,
            name: cluster.name,
            children: mapChildren(filteredProducts, clusters),
         }
      })
      .filter(cluster => cluster !== null) // Rimuovi i cluster nulli
}

const createCart = (item: any): Cart => {
   const validProducts = JSON.parse(localStorage.getItem('validProducts')) || {}
   let clusters: Cluster[] = validProducts[item.basketId] || []
   const itemsInCart = item.root[0].children
   clusters = mapClusterProducts(clusters, itemsInCart as Product[])

   const cart = {
      basketId: item.basketId,
      nodeId: item.root[0].nodeId,
      mainProductId: item.root[0].productId,
      tofProductId: item.root[0].offerTypeProductId,
      uniqueGuid: item.root[0].uniqueGuid,
      label: item.root[0].productName,
      price: item.root[0].price,
      activationPrice: item.root[0].activationPrice,
      children: mapChildren(itemsInCart as Product[], validProducts[item.basketId]),
   }

   return cart
}

const getTreeFromLocalStorage = (): any[] => {
   return JSON.parse(localStorage.getItem('tree'))
}

export const getTree = (): any[] => {
   return getTreeFromLocalStorage()
}

export const updateTree = () => {
   const quote = JSON.parse(localStorage.getItem('currentQuote'))

   if (quote) {
      if (!quote.solutions) {
         localStorage.removeItem('tree')
      } else {
         const tree = quote.solutions.map(createCart)
         localStorage.setItem('tree', JSON.stringify(tree))
      }
   }
}

export const getCart = (basketId: number) => {
   const quote = JSON.parse(localStorage.getItem('currentQuote'))

   return quote.solutions.find(basket => basket.basketId === basketId)
}

export const getCustomerQuote = () => {
   const quote = JSON.parse(localStorage.getItem('currentQuote'))

   return quote.customerQuote
}

export const updateValidProductsAndTree = (basketId: number, products: any) => {
   let validProducts = JSON.parse(localStorage.getItem('validProducts') || '{}')
   validProducts[basketId] = products
   localStorage.setItem('validProducts', JSON.stringify(validProducts))
   updateTree()
}

export const getCartIds = (): string[] => {
   const tree = getTreeFromLocalStorage()
   return tree.map(item => item.basketId)
}

export const getAllMainProductsIds = (): number[] => {
   const tree = getTreeFromLocalStorage()
   if (!tree || tree.length === 0) {
      return []
   }
   return tree.map(item => item.mainProductId)
}

export const getMainProductIdForBasketId = (basketId: number): number => {
   const tree = getTreeFromLocalStorage()
   const item = tree.find(item => item.basketId == basketId)
   return item ? item.mainProductId : undefined
}

export const getCartIdFromMainProductId = (id: number): number | undefined => {
   const tree = getTreeFromLocalStorage()
   const item = tree.find(item => item.mainProductId === id)
   return item ? item.basketId : undefined
}

export const hasMainProductId = (id: number): boolean => {
   const mainProductIds = getAllMainProductsIds()
   return mainProductIds.includes(id)
}

export const getSelectedProduct = (basketId: number, clusterId: number): number => {
   const tree = getTreeFromLocalStorage()
   const basket = tree.find(item => item.basketId == basketId)
   if (!basket) return null

   const findProduct = clusters => {
      for (const cluster of clusters) {
         if (cluster.clusterId == clusterId) {
            return cluster.id
         }
         if (cluster.children) {
            const result = findProduct(cluster.children)
            if (result) return result
         }
      }
      return null
   }

   return findProduct(basket.children)
}

export const searchTree = (key: string, value: any, basketId: number): any => {
   const tree = getTreeFromLocalStorage()
   const filteredTree = tree.filter(item => item.basketId == basketId)
   const node = findNodeProperty(key, value, null, false, filteredTree)

   return node
}

export const getNodeByBasketId = (basketId: number): any => {
   const tree = getTreeFromLocalStorage()
   return tree.find(item => item.basketId == basketId)
}

export const saveContract = async (contractData: any, pwData: any) => {
   const quote = JSON.parse(localStorage.getItem('currentQuote'))

   const contract = await apparoundData.saveContract(quote.quoteId, {
      ...contractData,
      clientCreationDate: new Date().toISOString(),
   })

   const currentContract = {
      id: contract.contract.id,
      properties: contract.contract.properties,
   }

   localStorage.setItem('contract', JSON.stringify(currentContract))

   localStorage.setItem('pwData', JSON.stringify(pwData))

   return currentContract
}

export const getContract = (): any => {
   const contract = JSON.parse(localStorage.getItem('contract')) || {}

   const contractData = {
      id: -1,
      properties: {
         headlessBillSendingMethod: '1',
         headlessPaymentType: '1',
      },
      ...contract,
   }

   return contractData
}

export const getPw = (): any => {
   const pwData = JSON.parse(localStorage.getItem('pwData')) || {}

   return pwData
}

export const createCustomer = async (customerDate: { [key: string]: any }) => {
   const localCustomer = JSON.parse(localStorage.getItem('customer')) || {}
   const quote = JSON.parse(localStorage.getItem('currentQuote')) || {}
   const currentCustomer = {
      customer: {
         ...CUSTOMER_DATA,
         id: localCustomer.id,
         properties: {
            ...CUSTOMER_DATA.properties,
            ...customerDate,
         },
      },
      customerQuoteId: quote.customerQuote?.id || -1,
   }

   localStorage.setItem('customerData', JSON.stringify(customerDate))

   try {
      await apparoundData.createCustomer(currentCustomer)

      await apparoundData.finalizeQuote(quote.quoteId)

      await apparoundData.sendPdfQuote(quote.quoteId)
   } catch (error) {
      return Promise.reject(error)
   }
}
