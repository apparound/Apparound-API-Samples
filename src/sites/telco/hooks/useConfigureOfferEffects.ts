import { useEffect } from 'react'

interface UseConfigureOfferEffectsProps {
   mainProduct: any
   cart: any
   startingProducts: any[]
   switchStates: Record<string, boolean>
   setProducts: (products: any[]) => void
   setSwitchStates: (states: Record<string, boolean>) => void
   setSelectedOfferGuid: (guid: string | null) => void
}

function cartContainsGuid(cartObj: any, guid: string): boolean {
   if (!cartObj || typeof cartObj !== 'object') return false
   if (cartObj[guid]) return true
   return Object.values(cartObj).some(value => cartContainsGuid(value, guid))
}

export const useConfigureOfferEffects = ({
   mainProduct,
   cart,
   startingProducts,
   switchStates,
   setProducts,
   setSwitchStates,
   setSelectedOfferGuid,
}: UseConfigureOfferEffectsProps) => {
   useEffect(() => {
      if (mainProduct?.clusters) {
         const clusters = mainProduct.clusters.slice(0, -1)
         const allProducts = clusters.flatMap(cluster => cluster.products)
         setProducts(allProducts)
         const initialSwitches = {}
         allProducts.forEach(p => {
            initialSwitches[p.guid] = false
         })
         setSwitchStates(initialSwitches)
      }
   }, [mainProduct, setProducts, setSwitchStates])

   useEffect(() => {
      if (cart) {
         const updatedSwitchStates = { ...switchStates }
         Object.keys(cart).forEach(clusterGuid => {
            Object.keys(cart[clusterGuid]?.children || {}).forEach(productGuid => {
               if (cart[clusterGuid]?.children[productGuid]) {
                  updatedSwitchStates[productGuid] = true
               }
            })
         })
         setSwitchStates(updatedSwitchStates)
      }
   }, [cart, switchStates, setSwitchStates])

   useEffect(() => {
      if (startingProducts && startingProducts.length > 0 && cart) {
         const found = startingProducts.find(p => cartContainsGuid(cart, p.guid))
         if (found) {
            setSelectedOfferGuid(found.guid)
         }
      }
   }, [startingProducts, cart, setSelectedOfferGuid])
}
