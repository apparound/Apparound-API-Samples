import { CartData } from '@/interfaces/CartData'
import { ProductToCart } from '@/interfaces/ProductToCart'
import { QuantityData } from '@/interfaces/QuantityData'
import { findNodeProperty } from './useQuote'
import { Product } from '@/interfaces/Product'
import serverConfigurations from '../../../server/serverConfiguration'
import { fetchData } from '@/utils/fetcher'

export const SERVER_URL: string = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : ''
const CPQ_ID: number = serverConfigurations.cpqId

export class ApparoundData {
   constructor() {}

   fetchData = fetchData

   getCPQId = () => {
      return CPQ_ID
   }

   getToken = async () => {
      return await this.fetchData('/token', 'post')
   }

   // TODO: convert to v2!
   getCustomer = async (filter?: any, sort?: any) => {
      if (!filter) filter = {}
      if (!sort) sort = {}

      return await this.fetchData(
         `/apparound/integration/api/customer/list?take=10&filter=${JSON.stringify(filter)}&sort=${JSON.stringify(
            sort
         )}`,
         'get'
      )
   }

   createCustomer = async (customer: any) => {
      return await this.fetchData('/apparound/v2/cpq/customerquote/create', 'post', customer)
   }

   updateCustomer = async (customer: any) => {
      return await this.createCustomer(customer)
   }

   initQuoteSession = async (cpqId: number, customerId: number) => {
      return await this.fetchData(`/apparound/v2/cpq/${cpqId}/customer/${customerId}/init`, 'get')
   }

   getStartingProducts = async (cpqId: number, tofId: number) => {
      return await this.fetchData(`/apparound/v2/cpq/${cpqId}/tof/${tofId}/validproducts`, 'get')
   }

   createCartWithCartData = async (cartData: CartData) => {
      const cpqId = this.getCPQId()
      const tofId = this.getTofId()
      const quoteId = this.getQuoteId()

      return await this.createCart(cpqId, tofId, cartData, quoteId)
   }

   createCart = async (cpqId: number, tofId: number, cartData: CartData, quoteId?: number) => {
      return await this.fetchData(
         `/apparound/v2/cpq/${cpqId}/tof/${tofId}/addcart?quoteId=${quoteId || -1}`,
         'post',
         cartData
      )
   }

   deleteCartById = async (basketId: number) => {
      const cpqId = this.getCPQId()
      const quoteId = this.getQuoteId()

      return this.deleteCart(cpqId, quoteId, basketId)
   }

   deleteCart = async (cpqId: number, quoteId: number, basketId: number) => {
      return await this.fetchData(`/apparound/v2/cpq/${cpqId}/quote/${quoteId}/basket/${basketId}`, 'delete')
   }

   addProduct(product: Product) {
      const cpqId = this.getCPQId()
      const quoteId = this.getQuoteId()
      const basketId = this.getBasketId(product.productId)
      const parentId = product.clusterId

      const productToCart: ProductToCart = {
         offerTypeId: this.getTofId(),
         productId: product.productId,
         offerTypeProductId: product.offerTypeProductId,
         itemUniqueId: product.uniqueGuid,
      }

      return this.fetchData(
         `/apparound/v2/cpq/${cpqId}/quote/${quoteId}/basket/${basketId}/parent/${parentId}/additemtocart`,
         'post',
         productToCart
      )
   }

   addProductToCart = async (
      cpqId: number,
      quoteId: number,
      basketId: number,
      parentId: number,
      product: ProductToCart
   ) => {
      return await this.fetchData(
         `/apparound/v2/cpq/${cpqId}/quote/${quoteId}/basket/${basketId}/parent/${parentId}/additemtocart`,
         'post',
         product
      )
   }

   removeProductFromCart = async (
      cpqId: number,
      quoteId: number,
      basketId: number,
      parentId: number,
      nodeId: number
   ) => {
      return await this.fetchData(
         `/apparound/v2/cpq/${cpqId}/quote/${quoteId}/basket/${basketId}/node/${nodeId}/parent/${parentId}`,
         'delete'
      )
   }

   setProductQuantity = async (cpqId: number, quoteId: number, basketId: number, data: QuantityData) => {
      return await this.fetchData(
         `/apparound/v2/cpq/${cpqId}/quote/${quoteId}/basket/${basketId}/quantity`,
         'put',
         data
      )
   }

   getValidProducts = async (
      cpqId: number,
      tofId: number,
      quoteId: number,
      basketId: number,
      nodeId: number,
      parentNodeId: number
   ) => {
      return await this.fetchData(
         `/apparound/v2/cpq/${cpqId}/tof/${tofId}/validproducts?quoteId=${quoteId}&basketId=${basketId}&nodeId=${nodeId}&parentId=${parentNodeId}`,
         'get'
      )
   }

   getImageOfProduct = async (imageName: String) => {
      return await this.fetchData(`/apparoundimages/v2/cpq/product/image?imagename=${imageName}`, 'get', null, 'blob')
   }

   finalizeQuote = async (quoteId: number) => {
      return await this.fetchData(`/apparound/v2/cpq/finalize/${quoteId}`, 'put')
   }

   sendPdfQuote = async (quoteId: number) => {
      return await this.fetchData(`/apparound/v2/cpq/sendpdfquote/${quoteId}`, 'put')
   }

   saveContract = async (quoteId: number, contractData: any) => {
      return (await this.fetchData(`/apparound/v2/contract/${quoteId}`, 'post', contractData)) || {}
   }

   getQuote = async (cpqId: number, quoteId: number) => {
      return await this.fetchData(`/apparound/v2/cpq/${cpqId}/quote/${quoteId}`, 'get')
   }

   getQuoteId = () => {
      const currentQuote = JSON.parse(localStorage.getItem('currentQuote') || '{}')
      return currentQuote.quoteId || -1
   }

   getCustomerId = () => {
      const customer = JSON.parse(localStorage.getItem('customer') || '{}')
      return customer.id || -1
   }

   getCustomerQuoteId = () => {
      return Number(localStorage.getItem('customerQuoteId')) || -1
   }

   getTofId = () => {
      return Number(localStorage.getItem('tofID')) || null
   }

   getBasketId = (serviceId: number) => {
      const basketId = findNodeProperty('productId', serviceId.toString(), null, true).basketId

      return basketId
   }
}
