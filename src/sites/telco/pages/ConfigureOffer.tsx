import { useSelector } from 'react-redux'
import { selectCart, selectMainProduct, selectStartingProducts, selectTofId } from '@/sites/retail/features/quoteSlice'
import { useState, useEffect } from 'react'
import { addProduct, deleteProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch } from 'react-redux'
import MainProducts from '@/sites/telco/components/MainProducts'
import Products from '@/sites/telco/components/Products'
import { useTranslation } from 'react-i18next'
import TelcoContainer from '../components/TelcoContainer'

const ConfigureOffer = () => {
   const { t } = useTranslation()
   const startingProducts = useSelector(selectStartingProducts)
   const tofId = useSelector(selectTofId)
   const dispatch = useDispatch()
   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])
   const [switchStates, setSwitchStates] = useState({})
   const [selectedOfferGuid, setSelectedOfferGuid] = useState<string | null>(null)
   const cart = useSelector(selectCart)
   const [addingMainProductGuid, setAddingMainProductGuid] = useState<string | null>(null)

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
   }, [mainProduct])

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
   }, [cart])

   function cartContainsGuid(cartObj: any, guid: string): boolean {
      if (!cartObj || typeof cartObj !== 'object') return false
      if (cartObj[guid]) return true
      return Object.values(cartObj).some(value => cartContainsGuid(value, guid))
   }

   useEffect(() => {
      if (startingProducts && startingProducts.length > 0 && cart) {
         const found = startingProducts.find(p => cartContainsGuid(cart, p.guid))
         if (found) {
            setSelectedOfferGuid(found.guid)
         }
      }
   }, [startingProducts, cart])

   const handleSelectMainProduct = async (guid: string) => {
      if (selectedOfferGuid) {
         setProducts([])
         await deleteProduct(selectedOfferGuid, dispatch)
      }
      setSelectedOfferGuid(guid)
   }

   if (!startingProducts || startingProducts.length === 0) {
      return null
   }
   return (
      <div className="min-h-screen bg-white">
         <TelcoContainer>
            <main className="max-w-4xl mx-auto py-12 px-4">
               <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t('Configura la tua offerta')}</h2>

               <MainProducts
                  {...{
                     startingProducts,
                     selectedOfferGuid,
                     setSelectedOfferGuid: handleSelectMainProduct,
                     addProduct,
                     addingProductGuid: addingMainProductGuid,
                     setAddingProductGuid: setAddingMainProductGuid,
                  }}
               />

               <Products
                  products={products}
                  switchStates={switchStates}
                  setSwitchStates={setSwitchStates}
                  addProduct={addProduct}
                  dispatch={dispatch}
                  parentGuid={mainProduct?.guid}
               />
            </main>
         </TelcoContainer>
      </div>
   )
}

export default ConfigureOffer
