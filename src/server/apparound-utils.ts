import axios from 'axios'
import jsonQ from 'jsonq'
import Ajv from 'ajv'

const SERVER_URL: string = process.env.SERVER_URL || ''
const CLIENT_ID: string = process.env.CLIENT_ID || ''
const SECRET: string = process.env.SECRET || ''

const DEFAULT_GUID = '00000000-0000-0000-0000-000000000000'
const SESSION_LIST: Record<string, any> = {}

const CUSTOMER_DATA = {
   id: -1,
   lastName: 'Rossi',
   firstName: 'Mario',
   email: 'mario.rossi@example.com',
   phoneNumber: '+393474455890',
   customerType: 'business',
   companyName: 'MarioRossi S.r.l.',
   vatNumber: '99999999990',
   properties: {
      customEmail: 'mario.rossi@example.com',
      customCheckBox: false,
      customPhoneMandatory: '+393474455890',
      customEmailMandatory: 'mario.rossi@example.com',
      contractPhone: '+393474455890',
      contractEmail: 'mario.rossi@example.com',
      dateTest: '2024-12-06',
      startContract: '2024-12-09',
      customCheckBox_not: true,
   },
}

const CUSTOMER_DATA_FILTER = {
   logic: 'and',
   filters: [
      {
         operator: 'eq',
         value: '99999999990',
         field: 'vatNumber',
      },
   ],
}

export class ApparoundUtils {
   private generateHeaders(sessionId: string, token?: string): Record<string, string> {
      const headers: Record<string, string> = {}

      if (sessionId && SESSION_LIST[sessionId]) {
         headers['X-SessionId'] = sessionId

         const session = SESSION_LIST[sessionId]
         if (session.TOKEN) headers['Authorization'] = `Bearer ${session.TOKEN}`
      }

      if (token) {
         headers['Authorization'] = `Bearer ${token}`
      }

      return headers
   }

   async fetchData(
      sessionId: any,
      token: any,
      api: string,
      method: 'get' | 'post' | 'put' | 'delete',
      bodyRequest?: any,
      responseType: 'json' | 'arraybuffer' = 'json',
      timeout: number = 0,
      returnAllResponse: boolean = false
   ): Promise<any> {
      const config = {
         responseType,
         headers: this.generateHeaders(sessionId, token),
         timeout,
      }

      try {
         const url = `${SERVER_URL}${api}`
         let response: any

         switch (method) {
            case 'get':
               response = await axios.get(url, config)
               break
            case 'post':
               response = await axios.post(url, bodyRequest, config)
               break
            case 'put':
               response = await axios.put(url, bodyRequest, config)
               break
            case 'delete':
               response = await axios.delete(url, config)
               break
            default:
               throw new Error('Invalid HTTP method')
         }

         return returnAllResponse ? response : response.data
      } catch (error: any) {
         return error
      }
   }

   saveSessionQuote(quote: any, sessionId: string): void {
      if (!quote) return
      SESSION_LIST[sessionId].QUOTE = Object.assign({}, quote)
   }

   generateProductList(validateProductResponse: any[], parentGuid: string): any[] {
      return validateProductResponse
         .map(cluster => {
            const products = cluster.productsTOF
               .filter((product: any) => product.parentGuid === parentGuid)
               .map((product: any) => ({
                  tofProductId: product.offerTypeProductId,
                  productId: product.productId,
                  guid: product.uniqueGuid,
                  parentGuid: product.parentGuid === DEFAULT_GUID ? '' : product.parentGuid,
                  greyedOut: product.greyedOut || 0,
                  label: product.productName || '',
                  description: product.productShortName || '',
                  icon: product.productDetail?.icon || '',
                  image: product.productDetail?.image || '',
                  activationPrice: product.productDetail?.productPriceDefinition?.[0]?.activationprice || 0,
                  price: product.productDetail?.productPriceDefinition?.[0]?.price || 0,
                  config: product.productDetail?.config.reduce((obj: any, item: any) => {
                     obj[item.code] = item.value

                     return obj
                  }, {}),
               }))

            if (products.length > 0) {
               return {
                  id: cluster.id,
                  label: cluster.name,
                  shortName: cluster.shortname,
                  code: cluster.code,
                  products,
               }
            }
         })
         .filter(cluster => cluster !== undefined)
   }

   async init(cpqId: number): Promise<any> {
      if (!cpqId) throw new Error('CpqId is Required!')

      let token = ''
      try {
         const responseToken = await this.getToken()
         token = responseToken.token || ''
      } catch (error: any) {
         throw new Error('Failed to retrieve TOKEN: ' + error.message)
      }

      const customer =
         (await this.getCustomer(token, CUSTOMER_DATA_FILTER).then((response: any[]) => {
            if (response.length > 0) {
               return response[0]
            } else {
               return this.createCustomer(token, CUSTOMER_DATA)
            }
         })) || {}

      let customerQuoteId: any = null
      let responseInitQuoteSession: any = null
      try {
         customerQuoteId = await this.createCustomerQuote(token, { ...CUSTOMER_DATA, id: customer.id }, -1)
         responseInitQuoteSession = await this.initQuoteSession(token, cpqId, customer.id)
      } catch (error) {
         console.log(error)
         return null
      }
      const cpqInfo = responseInitQuoteSession || {}

      SESSION_LIST[cpqInfo.sessionId] = {
         TOKEN: token,
         CPQ_ID: cpqId,
         TOF_ID: -1,
         QUOTE_ID: -1,
         QUOTE: null,
         STARTING_PRODUCTS: {},
         CUSTOMER_ID: customer.id,
         CUSTOMER_QUOTE_ID: customerQuoteId || -1,
      }

      let startingProducts: any = null
      if (cpqInfo?.tofList?.length > 0) {
         SESSION_LIST[cpqInfo.sessionId].TOF_ID = cpqInfo.tofList[0].id
         startingProducts = await this.getStartingProducts(
            cpqInfo.sessionId,
            cpqId,
            SESSION_LIST[cpqInfo.sessionId].TOF_ID
         )
         SESSION_LIST[cpqInfo.sessionId].STARTING_PRODUCTS[SESSION_LIST[cpqInfo.sessionId].TOF_ID] = Object.assign(
            {},
            startingProducts
         )
      }

      return {
         sessionId: cpqInfo.sessionId,
         customer,
         customerQuoteId,
         startingClusters: this.generateProductList(startingProducts?.leftAxis || [], DEFAULT_GUID),
      }
   }

   async initSession(cpqId: number): Promise<any> {
      if (!cpqId) throw new Error('CpqId is Required!')

      let token = ''
      try {
         const responseToken = await this.getToken()
         token = responseToken.token || ''
      } catch (error: any) {
         throw new Error('Failed to retrieve TOKEN: ' + error.message)
      }

      const customer =
         (await this.getCustomer(token, CUSTOMER_DATA_FILTER).then((response: any[]) => {
            if (response.length > 0) {
               return response[0]
            } else {
               return this.createCustomer(token, CUSTOMER_DATA)
            }
         })) || {}

      let customerQuoteId: any = null
      let responseInitQuoteSession: any = null
      try {
         customerQuoteId = await this.createCustomerQuote(token, { ...CUSTOMER_DATA, id: customer.id }, -1)
         responseInitQuoteSession = await this.initQuoteSession(token, cpqId, customer.id)
      } catch (error) {
         console.log(error)
         return null
      }
      const cpqInfo = responseInitQuoteSession || {}

      SESSION_LIST[cpqInfo.sessionId] = {
         TOKEN: token,
         CPQ_ID: cpqId,
         TOF_ID: -1,
         QUOTE_ID: -1,
         QUOTE: null,
         STARTING_PRODUCTS: {},
         CUSTOMER_ID: customer.id,
         CUSTOMER_QUOTE_ID: customerQuoteId || -1,
      }

      return {
         sessionId: cpqInfo.sessionId,
         customer,
         customerQuoteId,
         tofList: cpqInfo.tofList || [],
      }
   }

   async getToken(): Promise<any> {
      return await this.fetchData(null, null, '/apikey/token', 'post', {
         clientId: CLIENT_ID,
         secret: SECRET,
      })
   }

   async getCustomerBase(token: string, entity: string, filter: any = {}, sort: any = {}): Promise<any> {
      if (!entity) throw new Error('Entity is Required!')

      return await this.fetchData(
         null,
         token,
         `/integration/api/${entity}/list?take=10&filter=${JSON.stringify(filter)}&sort=${JSON.stringify(sort)}`,
         'get'
      )
   }

   async getCustomer(token: string, filter: any = {}, sort: any = {}): Promise<any> {
      return await this.getCustomerBase(token, 'customer', filter, sort)
   }

   async getCustomerQuote(token: string, filter: any = {}, sort: any = {}): Promise<any> {
      return await this.getCustomerBase(token, 'customerquote', filter, sort)
   }

   async createCustomerBase(token: string, customer: any, customerQuoteId?: number): Promise<any> {
      return await this.fetchData(null, token, '/v2/cpq/customerquote/create', 'post', {
         customer,
         customerQuoteId: customerQuoteId || null,
      })
   }

   async createCustomer(token: string, customerData: any): Promise<any> {
      const response: any = await this.createCustomerBase(token, customerData)
      return response.customer
   }

   async createCustomerQuote(token: string, customerData: any, customerQuoteId?: number): Promise<number> {
      const response = await this.createCustomerBase(token, customerData, customerQuoteId || -1)
      return response.customerQuoteId || -1
   }

   async updateCustomer(sessionId: string, customerData: any): Promise<any> {
      const token = SESSION_LIST[sessionId].TOKEN
      const customerId = SESSION_LIST[sessionId].CUSTOMER_ID
      const currentQuoteId = SESSION_LIST[sessionId].CUSTOMER_QUOTE_ID
      return await this.createCustomerBase(token, { ...customerData, id: customerId }, currentQuoteId)
   }

   async createCart(sessionId: string, cpqId: number, tofId: number, cartData: any, quoteId?: number): Promise<any> {
      return await this.fetchData(
         sessionId,
         null,
         `/v2/cpq/${cpqId}/tof/${tofId}/addcart?quoteId=${quoteId || -1}`,
         'post',
         cartData
      )
   }

   async deleteCart(sessionId: string, cartId: number): Promise<any> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID

      const response = await this.fetchData(
         sessionId,
         null,
         `/v2/cpq/${cpqId}/quote/${quoteId}/basket/${cartId}`,
         'delete'
      )
      this.saveSessionQuote(response.quote, sessionId)
      return { quote: response.quote, validation: response.validation }
   }

   async deleteCartByGuid(sessionId: string, cartGuid: string): Promise<any> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID

      const quote = await this.getQuote(sessionId, cpqId, quoteId)
      const cart = this.findCartByKey(quote, 'solutionId', cartGuid)

      if (cart) return await this.deleteCart(sessionId, cart.basketId)
      return null
   }

   async removeProductFromCart(sessionId: string, productGuid: string): Promise<any> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID

      const quote = await this.getQuote(sessionId, cpqId, quoteId)
      const productNode = this.findNodeByGuid(quote, productGuid)
      const parentNode = this.findParentNodeByProductGuid(quote, productGuid)
      const basket = this.findCartByProductGuid(quote, productGuid)

      let response: any = null
      if (parentNode === null) response = await this.deleteCart(sessionId, basket.basketId)
      else
         response = await this.fetchData(
            sessionId,
            null,
            `/v2/cpq/${cpqId}/quote/${quoteId}/basket/${basket.basketId}/node/${productNode.nodeId}/parent/${parentNode.nodeId}`,
            'delete'
         )
      this.saveSessionQuote(response.quote, sessionId)
      return { quote: response.quote, validation: response.validation }
   }

   async getImageOfProduct(sessionId: string, imageName: string): Promise<any> {
      return await this.fetchData(
         sessionId,
         null,
         `/v2/cpq/product/image?imagename=${imageName}`,
         'get',
         null,
         'arraybuffer',
         0,
         true
      )
   }

   async getCartInfo(sessionId: string, cartId: number): Promise<any> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID

      const quote = await this.getQuote(sessionId, cpqId, quoteId)
      const cart = this.findCartByKey(quote, 'baskedId', cartId)

      if (cart) {
         return {
            id: cart.basketId,
            guid: cart.solutionId || '',
            label: cart.cartName || '',
            price: cart.price || 0,
            activationPrice: cart.activationPrice || 0,
         }
      }
      return null
   }

   async getCartInfoByCartGuid(sessionId: string, cartGuid: string): Promise<any> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID

      const quote = await this.getQuote(sessionId, cpqId, quoteId)
      const cart = this.findCartByKey(quote, 'solutionId', cartGuid)

      if (cart) {
         return {
            id: cart.basketId,
            guid: cart.solutionId || '',
            label: cart.cartName || '',
            price: cart.price || 0,
            activationPrice: cart.activationPrice || 0,
         }
      }
      return null
   }

   async getCartProducts(sessionId: string, cartId: number): Promise<any[]> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID

      const quote = await this.getQuote(sessionId, cpqId, quoteId)
      const cart = this.findCartByKey(quote, 'baskedId,', cartId)

      if (cart) return this.flattenCartProducts(cart.root[0])
      return []
   }

   async getCartProductsByCartGuid(sessionId: string, cartGuid: string): Promise<any[]> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID

      const quote = await this.getQuote(sessionId, cpqId, quoteId)
      const cart = this.findCartByKey(quote, 'solutionId,', cartGuid)

      if (cart) return this.flattenCartProducts(cart.root[0])
      return []
   }

   async addProductToCart(
      sessionId: string,
      cpqId: number,
      quoteId: number,
      basketId: number,
      parentId: number,
      product: any
   ): Promise<any> {
      return await this.fetchData(
         sessionId,
         null,
         `/v2/cpq/${cpqId}/quote/${quoteId}/basket/${basketId}/parent/${parentId}/additemtocart`,
         'post',
         product
      )
   }

   async setProductQuantity(sessionId: string, productGuid: string, quantity: number): Promise<any> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID
      const quote = await this.getQuote(sessionId, cpqId, quoteId)

      const productNode = this.findNodeByGuid(quote, productGuid)
      const parentNode = this.findParentNodeByProductGuid(quote, productGuid)
      const basket = this.findCartByProductGuid(quote, productGuid)

      const response = await this.fetchData(
         sessionId,
         null,
         `/v2/cpq/${cpqId}/quote/${quoteId}/basket/${basket.basketId}/quantity`,
         'put',
         {
            nodeId: productNode?.nodeId || null,
            parentId: parentNode?.nodeId || null,
            quantity,
         }
      )

      this.saveSessionQuote(response.quote, sessionId)
      return response
   }

   async initQuoteSession(token: string, cpqId: number, customerId: number): Promise<any> {
      return await this.fetchData(null, token, `/v2/cpq/${cpqId}/customer/${customerId}/init`, 'get')
   }

   async getStartingProducts(sessionId: string, cpqId: number, tofId: number): Promise<any> {
      if (SESSION_LIST[sessionId].STARTING_PRODUCTS[tofId]) return SESSION_LIST[sessionId].STARTING_PRODUCTS[tofId]
      return await this.fetchData(sessionId, null, `/v2/cpq/${cpqId}/tof/${tofId}/validproducts`, 'get')
   }

   async getValidProductsLegacy(sessionId: string, productGuid: string): Promise<any[]> {
      return await this.getValidProducts(sessionId, SESSION_LIST[sessionId].TOF_ID, productGuid)
   }

   async getValidProducts(sessionId: string, tofId: string, productGuid: string): Promise<any[]> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID

      const quote: any = await this.getQuote(sessionId, cpqId, quoteId)
      let response: any = {}

      if (productGuid) {
         const productNode: any = this.findNodeByGuid(quote, productGuid)
         const parentNode: any = this.findParentNodeByProductGuid(quote, productGuid)
         const basket: any = this.findCartByProductGuid(quote, productGuid)

         response = await this.fetchData(
            sessionId,
            null,
            `/v2/cpq/${cpqId}/tof/${tofId}/validproducts?quoteId=${quoteId}&basketId=${basket.basketId}&nodeId=${
               productNode?.nodeId
            }&parentId=${parentNode?.nodeId || null}`,
            'get'
         )
         return [
            ...this.generateProductList(response.bottomAxis || [], productGuid),
            ...this.generateProductList(response.rightAxis || [], productGuid),
         ]
      } else {
         response = await this.getStartingProducts(sessionId, cpqId, parseInt(tofId))
         return this.generateProductList(response?.leftAxis || [], DEFAULT_GUID)
      }
   }

   async getQuote(sessionId: string, cpqId: number, quoteId: number): Promise<any> {
      if (SESSION_LIST[sessionId].QUOTE) return SESSION_LIST[sessionId].QUOTE
      const response: any = await this.fetchData(sessionId, null, `/v2/cpq/${cpqId}/quote/${quoteId}`, 'get')
      return response?.quote || null
   }

   async getEntitySchema(token: string, entity: string): Promise<any> {
      return await this.fetchData(null, token, `/v2/cpq/entity/${entity}/schema`, 'get')
   }

   async manageEntitySchemaErrors(sessionId: string, entity: string, data: any): Promise<any> {
      const token: string = SESSION_LIST[sessionId].TOKEN
      const schema: any = await this.getEntitySchema(token, entity)

      const ajv = new Ajv()
      const validate = ajv.compile(schema)
      const valid = validate(data)
      if (!valid) return validate.errors
      return null
   }

   async saveContract(sessionId: string, contractData: any) {
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID
      return await this.fetchData(sessionId, null, `/v2/contract/${quoteId}`, 'post', contractData || {})
   }

   async finalizeQuote(sessionId: string) {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID
      await this.fetchData(sessionId, null, `/v2/cpq/finalize/${quoteId}`, 'put')
      const quote = await this.fetchData(sessionId, null, `/v2/cpq/${cpqId}/quote/${quoteId}`, 'get')
      this.saveSessionQuote(quote, sessionId)
      return quote
   }

   async getPdfQuote(sessionId: string): Promise<any> {
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID
      try {
         const response = await this.fetchData(
            sessionId,
            null,
            `/v2/quote/${quoteId}/pdf`,
            'get',
            null,
            'arraybuffer',
            3000,
            true
         )
         if (response.code === 'ECONNABORTED' || response.status === 202) return this.getPdfQuote(sessionId)
         return response
      } catch (error: any) {
         if (error.code === 'ECONNABORTED' || error.status === 202) return this.getPdfQuote(sessionId)
         throw new Error('Failed to fetch PDF quote: ' + error.message)
      }
   }

   async addProductLegacy(sessionId: string, productGuid: string, parentGuid?: string): Promise<any> {
      const tofId = SESSION_LIST[sessionId].TOF_ID
      return await this.addProduct(sessionId, tofId, productGuid, parentGuid)
   }

   async addProduct(sessionId: string, tofId: string, productGuid: string, parentGuid?: string): Promise<any> {
      const cpqId = SESSION_LIST[sessionId].CPQ_ID
      const quoteId = SESSION_LIST[sessionId].QUOTE_ID
      const quote = await this.getQuote(sessionId, cpqId, quoteId)

      if (!parentGuid) {
         const startingProducts = await this.getStartingProducts(
            sessionId,
            cpqId,
            quote?.offerTypeId || parseInt(tofId)
         )
         const product = this.findProductByKey(startingProducts.leftAxis, 'uniqueGuid', productGuid)

         if (product) {
            const cartData = {
               customerId: quote?.customerId || SESSION_LIST[sessionId].CUSTOMER_ID,
               customerQuoteId: quote?.customerQuote?.id || SESSION_LIST[sessionId].CUSTOMER_QUOTE_ID,
               productId: product.productId,
               tofProductId: product.offerTypeProductId,
            }

            const response: any = await this.createCart(
               sessionId,
               cpqId,
               quote?.offerTypeId || parseInt(tofId),
               cartData,
               quoteId || -1
            )

            this.saveSessionQuote(response.quote, sessionId)
            SESSION_LIST[sessionId].QUOTE_ID = response.quote?.quoteId
            return { quote: response.quote, validation: response.validation }
         }
      } else {
         const parentNode = this.findNodeByGuid(quote, parentGuid)
         const basket = this.findCartByProductGuid(quote, parentGuid)
         const validProducts = await this.getValidProducts(sessionId, tofId, parentGuid)
         const product = this.findProductByKey(validProducts, 'guid', productGuid)

         if (product) {
            const productData = {
               offerTypeId: Number(tofId),
               productId: product.productId,
               offerTypeProductId: product.tofProductId,
               itemUniqueId: productGuid,
            }

            const response: any = await this.addProductToCart(
               sessionId,
               cpqId,
               quoteId || -1,
               basket.basketId,
               parentNode.nodeId,
               productData
            )

            this.saveSessionQuote(response.quote, sessionId)
            return { quote: response.quote, validation: response.validation, solutionId: basket.solutionId }
         }
      }
   }

   private findNodeByGuid(quote: any, guid: string): any {
      const quoteJsonQ = jsonQ(quote)
      const nodes = quoteJsonQ.find('uniqueGuid', function (this: any) {
         return this == guid
      })
      if (nodes.length == 1) return quoteJsonQ.pathValue(nodes.jsonQ_current[0].path.slice(0, -1))
      return null
   }

   private findParentNodeByProductGuid(quote: any, guid: string): any {
      const quoteJsonQ = jsonQ(quote)
      const nodes = quoteJsonQ.find('uniqueGuid', function (this: any) {
         return this == guid
      })
      if (nodes.length == 1) {
         const path = nodes.jsonQ_current[0].path.slice(0, -2)
         if (path[path.length - 1] != 'root') return quoteJsonQ.pathValue(nodes.jsonQ_current[0].path.slice(0, -3))
      }
      return null
   }

   private findCartByProductGuid(quote: any, guid: string): any {
      const quoteJsonQ = jsonQ(quote)
      const nodes = quoteJsonQ.find('uniqueGuid', function (this: any) {
         return this == guid
      })
      if (nodes.length == 1) return quoteJsonQ.pathValue(nodes.jsonQ_current[0].path.slice(0, 2))
      return null
   }

   private findCartByKey(quote: any, key: string, value: any): any {
      const quoteJsonQ = jsonQ(quote)
      const nodes = quoteJsonQ.find(key || 'basketId', function (this: any) {
         return this == value
      })
      if (nodes.length == 1) return quoteJsonQ.pathValue(nodes.jsonQ_current[0].path.slice(0, -1))
      return null
   }

   private findProductByKey(products: any[], key: string, value: any): any {
      const productsJsonQ = jsonQ(products)
      const nodes = productsJsonQ.find(key || 'uniqueGuid', function (this: any) {
         return this == value
      })
      if (nodes.length == 1) return productsJsonQ.pathValue(nodes.jsonQ_current[0].path.slice(0, -1))
      return null
   }

   private flattenCartProducts(node: any, parentGuid: string | null = null): any[] {
      const elem = {
         id: node.nodeId,
         guid: node.uniqueGuid || '',
         label: node.productFullName || '',
         price: node.recurringPriceAmount || 0,
         activationPrice: node.oneOffPriceAmount || 0,
         productId: node.productId || -1,
         tofProductId: node.offerTypeProductId || -1,
         quantity: node.quantity || 1,
         commitment: node.commitment || 0,
         parentGuid: parentGuid || '',
      }
      let result = [elem]
      if (node.children && node.children.length > 0) {
         node.children.forEach((child: any) => {
            result = result.concat(this.flattenCartProducts(child, node.uniqueGuid))
         })
      }
      return result
   }
}
