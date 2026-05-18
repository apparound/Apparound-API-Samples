import { useSelector } from 'react-redux'
import { selectCart, selectMainProduct, selectStartingProducts, selectTofId } from '@/sites/retail/features/quoteSlice'
import { useState } from 'react'
import { addProduct, deleteProduct } from '@/sites/telco/hooks/apparoundData'
import { useDispatch } from 'react-redux'
import MainProducts from '@/sites/telco/components/MainProducts'
import Products from '@/sites/telco/components/Products'
import { useTranslation } from 'react-i18next'
import TelcoContainer from '../components/TelcoContainer'
import { useConfigureOfferEffects } from '../hooks/useConfigureOfferEffects'

const ConfigureOffer = () => {
   const { t } = useTranslation()
   const startingProducts = useSelector(selectStartingProducts)
   const dispatch = useDispatch()
   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])
   const [switchStates, setSwitchStates] = useState({})
   const [selectedOfferGuid, setSelectedOfferGuid] = useState<string | null>(null)
   const cart = useSelector(selectCart)
   const [addingMainProductGuid, setAddingMainProductGuid] = useState<string | null>(null)

   // Utilizzo del hook personalizzato per gli effetti
   useConfigureOfferEffects({
      mainProduct,
      cart,
      startingProducts,
      switchStates,
      setProducts,
      setSwitchStates,
      setSelectedOfferGuid,
   })

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
         <TelcoContainer step={0} showTofList={true}>
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
