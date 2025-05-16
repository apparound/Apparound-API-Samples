import { createSelector, createSlice } from '@reduxjs/toolkit'
import { config } from '@/sites/retail/config'
import { Product } from '@/interfaces/Product'
import { create } from 'domain'

interface cartI {
   [key: string]: cartI
}

interface contractDataI {
   [key: string]: any
   properties?: {
      [key: string]: string | number | boolean
   }
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
      toReturn[child.uniqueGuid] = createCartFromQuote(child.children) || {}
   })

   return toReturn
}

const addProductKeyToCart = (cart: cartI, parentGuid: string, productGuid: string) => {
   if (parentGuid) {
      if (cart[parentGuid]) {
         cart[parentGuid] = {
            ...(cart[parentGuid] || {}),
            [productGuid]: {},
         }
      } else {
         Object.entries(cart).forEach(([key, value]) => {
            cart[key] = addProductKeyToCart(value, parentGuid, productGuid)
         })
      }
   } else {
      cart[productGuid] = {}
   }

   return cart
}

const deleteProductR = (cart: cartI, guid: string) => {
   if (cart[guid]) {
      delete cart[guid]
   } else {
      Object.entries(cart).forEach(([key, value]) => {
         cart[key] = deleteProductR(value, guid)
      })
   }

   return cart
}

const flatCart = (cart: Record<string, any>): string[] => {
   if (!cart || typeof cart !== 'object') return []

   return [...Object.keys(cart), ...Object.values(cart).flatMap(flatCart)]
}

export const quoteSlice = createSlice({
   name: 'quote',
   initialState,
   reducers: {
      reset: () => {
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
         const tree = payload.tofList.map(item => ({
            id: item.id,
            name: item.name,
            rank: item.rank,
            tofGroupId: item.tofGroupId,
            tofGroupName: item.tofGroupName,
            payments: item.payments,
            config: item.config,
            isCampaign: item.isCampaign,
            image: item.image,
         }))
         state.tree = tree
         state.customer = {
            ...payload.customer,
         }
      },
      updateStartingProducts: (state, { payload }) => {
         const { products } = payload
         state.tofId = payload.id
         state.startingProducts = products.map(product => ({
            id: product.productId,
            guid: product.guid,
            label: product.label,
            description: product.description,
            price: product.price,
            activationPrice: product.activationPrice,
            config: product.config,
         }))

         console.log('Starting products:', state.startingProducts)
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
         state.tofId = tofId
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
      },
   },
})

export const selectTree = state => state.quote.tree
export const selectCart = state => state.quote.cart || {}
export const selectIsValid = state => state.quote.isValid
export const selectMainProduct = state => {
   return state.quote.tree?.find(item => item.guid === Object.keys(state.quote.cart)[0]) || {}
}
export const selectSizeProducts = getSelected => state => {
   const mainProduct = state.quote.tree?.find(item => item.guid === Object.keys(state.quote.cart)[0])

   const selectedSizeGuid = Object.keys(state.quote.cart[Object.keys(state.quote.cart || {})[0]] || {})[0]

   const mainCluster = mainProduct?.clusters?.find(cluster => cluster.label === config.mainClusterLabel) || {}

   const toReturn = mainCluster?.products || []

   return getSelected ? toReturn.find(item => item.guid === selectedSizeGuid) : toReturn
}

export const selectFlatCart = createSelector([selectCart], cart => flatCart(cart))
export const selectQuotePrice = state => {
   return state.quote?.quote?.netOneOffPriceWithVatAmount
}
export const selectAddedToCart = state => {
   return state.quote?.addedToCart
}
export const selectColorProduct = state => {
   const mainProduct = state.quote.tree?.find(item => item.guid === Object.keys(state.quote.cart)[0])

   const selectedSizeGuid = Object.keys(state.quote.cart[Object.keys(state.quote.cart || {})[0]] || {})[0]

   const mainCluster = mainProduct?.clusters?.find(cluster => cluster.label === config.mainClusterLabel) || {}

   const selectedSize = mainCluster?.products?.find(item => item.guid === selectedSizeGuid)

   const colorCluster = selectedSize?.clusters?.find(cluster => cluster.label === config.colorClusterLabel) || {}

   const cartItems = flatCart(state.quote.cart || {})

   return colorCluster?.products?.find(product => cartItems.includes(product.guid))
}
export const selectCartClusters = createSelector(
   [selectMainProduct, selectCart, selectFlatCart],
   (mainProduct, cart, flatCart) => {
      if (!cart || !flatCart || !mainProduct) return null

      const selectedSizeGuid = Object.keys(cart[Object.keys(cart || {})[0]] || {})[0]

      const mainCluster = mainProduct?.clusters?.find(cluster => cluster.label === config.mainClusterLabel) || {}

      const selectedSize = mainCluster?.products?.find(item => item.guid === selectedSizeGuid)

      return {
         mainCluster,
         selectedSize,
         clusters:
            selectedSize?.clusters?.map(cluster => ({
               ...cluster,
               selectedProduct: cluster?.products?.find(item => flatCart.includes(item.guid)),
            })) || [],
      }
   }
)
export const selectContractProperties = state => state.quote.contract.properties
export const selectContract = state => state.quote.contract
export const selectCustomer = state => state.quote.customer
export const selectQuote = state => state.quote.quote

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
      }))
   }
)
export const selectTofId = createSelector(
   state => state.quote.tofId,
   tofId => tofId
);

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
} = quoteSlice.actions

export default quoteSlice.reducer
