import { createSelector, createSlice } from '@reduxjs/toolkit'
import { config } from '@/sites/retail/config'
import { Product } from '@/interfaces/Product'

interface cartI {
   [key: string]: {
      quantity: number
      children: cartI
   }
}

interface contractDataI {
   [key: string]: any
   properties?: {
      [key: string]: string | number | boolean
   }
}

interface documentDataI {
   documentType?: string
   documentNumber?: string
   releaseDate?: string
   expiryDate?: string
   frontImage?: string
   backImage?: string
}

interface initialState {
   cart: cartI
   tree?: any[]
   sessionId?: string
   quote?: any
   isValid: boolean
   addedToCart: boolean
   contract?: contractDataI
   customer?: any
   tofId?: string
   startingProducts?: Product[]
   tofList?: any[]
   documentData?: documentDataI
}

const initialState: initialState = {
   cart: {},
   isValid: false,
   addedToCart: false,
   contract: {
      id: -1,
      clientCreationDate: new Date().toISOString(),
      properties: {},
   },
   documentData: {
      documentType: undefined,
      documentNumber: '',
      releaseDate: '',
      expiryDate: '',
      frontImage: undefined,
      backImage: undefined,
   },
}

const addProductsToParent = (tree: any[], clusters: any[], productGuid: string) => {
   tree.forEach(item => {
      if (item.guid === productGuid) {
         item.clusters = clusters
      } else if (item.clusters) {
         item.clusters = item.clusters.map(cluster => {
            cluster.products = addProductsToParent(cluster.products || [], clusters, productGuid)

            return cluster
         })
      }
   })

   return tree
}

const createCartFromQuote = children => {
   const toReturn = {}
   children.forEach(child => {
      toReturn[child.uniqueGuid] = {
         quantity: child.quantity || 0,
         children: createCartFromQuote(child.children || []),
      }
   })
   return toReturn
}

const addProductKeyToCart = (cart: cartI, parentGuid: string, productGuid: string) => {
   if (parentGuid) {
      if (cart[parentGuid]) {
         const parent = cart[parentGuid]
         if (!parent.children[productGuid]) {
            parent.children[productGuid] = { quantity: 1, children: {} }
         }
      } else {
         Object.entries(cart).forEach(([key, value]) => {
            cart[key].children = addProductKeyToCart(value.children, parentGuid, productGuid)
         })
      }
   } else {
      if (!cart[productGuid]) {
         cart[productGuid] = { quantity: 1, children: {} }
      }
   }
   return cart
}

const deleteProductR = (cart: cartI, guid: string) => {
   if (cart[guid]) {
      delete cart[guid]
   } else {
      Object.entries(cart).forEach(([key, value]) => {
         value.children = deleteProductR(value.children, guid)
      })
   }
   return cart
}

const flatCart = (cart: cartI): string[] => {
   if (!cart || typeof cart !== 'object') return []
   return [...Object.keys(cart), ...Object.values(cart).flatMap(item => flatCart(item.children))]
}

const flatCartWithQuantities = (cart: cartI): { guid: string; quantity: number }[] => {
   if (!cart || typeof cart !== 'object') return []
   return Object.entries(cart).flatMap(([guid, item]) => [
      { guid, quantity: item.quantity },
      ...flatCartWithQuantities(item.children),
   ])
}

const setProductQuantity = (cart: cartI, productGuid: string, quantity: number): cartI => {
   if (cart[productGuid]) {
      cart[productGuid].quantity = quantity
   } else {
      Object.values(cart).forEach(item => {
         setProductQuantity(item.children, productGuid, quantity)
      })
   }
   return cart
}

export const quoteSlice = createSlice({
   name: 'quote',
   initialState,
   reducers: {
      reset: state => {
         localStorage.removeItem('documentData')
         return initialState
      },
      initQuote: (state, { payload }) => {
         localStorage.setItem('sessionId', payload.sessionId)
         state.sessionId = payload.sessionId
         const tree = []
         payload.startingClusters.forEach(item => {
            tree.push(...item.products)
         })
         state.tree = tree
         state.customer = {
            ...payload.customer,
         }
      },
      initQuoteTofsList: (state, { payload }) => {
         localStorage.setItem('sessionId', payload.sessionId)
         state.sessionId = payload.sessionId
         state.tofList = payload.tofList
         state.customer = {
            ...payload.customer,
         }
      },
      updateStartingProducts: (state, { payload }) => {
         const { products, tofId } = payload
         state.tofId = tofId
         state.startingProducts = products.map(product => ({
            id: product.productId,
            guid: product.guid,
            label: product.label,
            description: product.description,
            price: product.price,
            activationPrice: product.activationPrice,
            config: product.config,
            icon: product.icon,
         }))
         state.tree = state.startingProducts
      },
      addProduct: (state, { payload }) => {
         const { productGuid, parentGuid, products, quote, solutionId, validation, tofId } = payload

         if (solutionId) {
            state.cart = createCartFromQuote(quote.solutions.find(solution => solution.solutionId === solutionId)?.root)
         } else {
            state.cart = addProductKeyToCart(state.cart, parentGuid, productGuid)
         }
         state.tree = addProductsToParent(state.tree, products, productGuid)
         state.quote = quote
         state.isValid = validation.isValid
         state.tofId = tofId ? tofId : state.tofId
      },
      updateQuote: (state, { payload }) => {
         state.quote = payload
      },
      addToCart: state => {
         state.addedToCart = true
      },
      updateContract: (state, { payload }) => {
         state.contract = {
            ...state.contract,
            ...payload,
         }
      },
      updateContractProperties: (state, { payload }) => {
         state.contract.properties = {
            ...state.contract.properties,
            ...payload,
         }
      },
      updateCustomer: (state, { payload }) => {
         state.customer = {
            ...state.customer,
            ...payload,
         }
      },
      deleteProduct: (state, { payload }) => {
         state.cart = deleteProductR(state.cart, payload.productGuid)
         if (payload.quote) {
            state.quote = payload.quote
         }
         if (payload.validation) {
            state.isValid = payload.validation.isValid
         }
      },
      setProductQuantityReducer: (state, { payload }) => {
         const { productGuid, quantity } = payload
         state.cart = setProductQuantity(state.cart, productGuid, quantity)
      },
      updateDocumentData: (state, { payload }) => {
         state.documentData = {
            ...state.documentData,
            ...payload,
         }
      },
      saveDocumentData: state => {
         if (state.documentData) {
            localStorage.setItem('documentData', JSON.stringify(state.documentData))
         }
      },
      loadDocumentData: state => {
         const savedData = localStorage.getItem('documentData')
         if (savedData) {
            try {
               state.documentData = {
                  ...state.documentData,
                  ...JSON.parse(savedData),
               }
            } catch (error) {
               console.error('Errore nel caricamento dei dati del documento:', error)
            }
         }
      },
      clearDocumentData: state => {
         state.documentData = {
            documentType: undefined,
            documentNumber: '',
            releaseDate: '',
            expiryDate: '',
            frontImage: undefined,
            backImage: undefined,
         }
         localStorage.removeItem('documentData')
      },
   },
})

export const selectTree = state => state.quote.tree
export const selectCart = state => state.quote.cart || {}
export const selectIsValid = state => state.quote.isValid
export const selectMainProduct = createSelector(
   [state => state.quote.tree, state => state.quote.cart],
   (tree, cart) => {
      const mainGuid = Object.keys(cart)[0]
      return tree?.find(item => item.guid === mainGuid) || {}
   }
)
export const selectSizeProducts = getSelected => state => {
   const cart = state.quote.cart || {}
   const tree = state.quote.tree || []
   const mainGuid = Object.keys(cart)[0]
   const mainProduct = tree.find(item => item.guid === mainGuid)
   const mainProductInCart = cart[mainGuid] || {}
   const selectedSizeGuid = Object.keys(mainProductInCart.children || {})[0]
   const mainCluster = mainProduct?.clusters?.find(cluster => cluster.label === config.mainClusterLabel) || {}
   const toReturn = mainCluster?.products || []
   return getSelected ? toReturn.find(item => item.guid === selectedSizeGuid) : toReturn
}

export const selectFlatCart = createSelector([selectCart], cart => flatCart(cart))

export const selectFlatCartWithQuantities = createSelector([selectCart], cart => flatCartWithQuantities(cart))

export const selectQuotePrice = state => {
   return state.quote?.quote?.netOneOffPriceWithVatAmount
}

export const selectQuoteMontlyPrice = state => {
   return state.quote?.quote?.netRecurringPriceWithVatAmount
}

export const selectAddedToCart = state => {
   return state.quote?.addedToCart
}

export const selectColorProduct = state => {
   const cart = state.quote.cart || {}
   const tree = state.quote.tree || []
   const mainGuid = Object.keys(cart)[0]
   const mainProduct = tree.find(item => item.guid === mainGuid)
   const mainProductInCart = cart[mainGuid] || {}
   const selectedSizeGuid = Object.keys(mainProductInCart.children || {})[0]
   const mainCluster = mainProduct?.clusters?.find(cluster => cluster.label === config.mainClusterLabel) || {}
   const selectedSize = mainCluster?.products?.find(item => item.guid === selectedSizeGuid)
   const selectedSizeInCart = mainProductInCart.children[selectedSizeGuid] || {}
   const colorCluster = selectedSize?.clusters?.find(cluster => cluster.label === config.colorClusterLabel) || {}
   return colorCluster?.products?.find(
      product => selectedSizeInCart.children && selectedSizeInCart.children[product.guid]
   )
}

export const selectCartClusters = createSelector(
   [selectMainProduct, selectCart, selectFlatCart],
   (mainProduct, cart, flatCart) => {
      if (!cart || !flatCart || !mainProduct) return null

      const getFirstKey = obj => Object.keys(obj || {})[0]
      const mainGuid = getFirstKey(cart)
      const mainProductInCart = cart[mainGuid] || {}
      const selectedSizeGuid = getFirstKey(mainProductInCart.children)
      const mainCluster = mainProduct?.clusters?.find(cluster => cluster.label === config.mainClusterLabel) || {}
      const selectedSize = mainCluster?.products?.find(item => item.guid === selectedSizeGuid)
      const selectedSizeInCart = mainProductInCart.children[selectedSizeGuid] || {}
      return {
         mainCluster,
         selectedSize,
         clusters:
            selectedSize?.clusters?.map(cluster => ({
               ...cluster,
               selectedProduct: cluster?.products?.find(
                  item => selectedSizeInCart.children && selectedSizeInCart.children[item.guid]
               ),
            })) || [],
      }
   }
)
export const selectContractProperties = state => state.quote.contract.properties
export const selectContract = state => state.quote.contract
export const selectCustomer = state => state.quote.customer
export const selectQuote = state => state.quote.quote
export const selectTofList = state => state.quote.tofList

export const selectStartingProducts = createSelector(
   state => state.quote.startingProducts,
   startingProducts => {
      if (!startingProducts) return []
      return startingProducts.map(product => ({
         id: product.productId,
         guid: product.guid,
         label: product.label,
         description: product.description,
         price: product.price,
         activationPrice: product.activationPrice,
         config: product.config,
         icon: product.icon,
      }))
   }
)
export const selectTofId = state => state.quote.tofId

// Selettore per i dati del documento
export const selectDocumentData = state => state.quote.documentData

export const {
   reset,
   initQuote,
   initQuoteTofsList,
   addProduct,
   deleteProduct,
   addToCart,
   updateContractProperties,
   updateCustomer,
   updateQuote,
   updateContract,
   updateStartingProducts,
   setProductQuantityReducer,
   updateDocumentData,
   saveDocumentData,
   loadDocumentData,
   clearDocumentData,
} = quoteSlice.actions

export default quoteSlice.reducer
