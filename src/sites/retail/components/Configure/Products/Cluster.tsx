import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFlatCart, selectSizeProducts } from '@/sites/retail/features/quoteSlice'
import Collapse from '@/sites/retail/components/Collapse/Collapse'
import Item from '@/sites/retail/components/Collapse/Item'
import { hideLoader, showLoader } from '@/sites/retail/features/appSlice'
import { addProduct, deleteProduct } from '@/sites/retail/hooks/apparoundData'
import { currencyNumberFormat, getImageUrl } from '@/utils/utils'
import { useTranslation } from 'react-i18next'

const Cluster = () => {
   const { t } = useTranslation()
   const dispatch = useDispatch()
   const [show, setShow] = useState(0)
   const flatCart: string[] = useSelector(selectFlatCart) || []
   const sizeProduct = useSelector(selectSizeProducts(true))

   const selectProduct = async (product: any, cluster: any) => {
      dispatch(showLoader())
      for (const tmpProduct of cluster.products) {
         if (flatCart.includes(tmpProduct.guid)) {
            await deleteProduct(tmpProduct.guid, dispatch)
         }
      }

      await addProduct(product.guid, dispatch, product.parentGuid, true)

      dispatch(hideLoader())
   }
   return (
      <>
         {sizeProduct.clusters.map((item, index) => {
            const isLast = index === sizeProduct.clusters.length - 1
            const selectedProduct = item.products.find(product => flatCart.includes(product.guid))
            return (
               <Collapse
                  item={item}
                  show={index === show}
                  isLast={isLast}
                  setShow={(show: boolean) => setShow(show ? index : null)}
                  key={index}
                  selectedProduct={selectedProduct}
               >
                  {item.products.map((product: any, innerIndex: any) => {
                     const isSelected = selectedProduct?.guid === product.guid
                     return (
                        <Item
                           img={getImageUrl(product.icon)}
                           text={product.label}
                           info={
                              product.activationPrice
                                 ? `+${currencyNumberFormat(product.activationPrice)}`
                                 : t('Incluso')
                           }
                           key={`${index}-${innerIndex}`}
                           isSelected={isSelected}
                           onClick={() => {
                              selectProduct(product, item)
                           }}
                        />
                     )
                  })}
               </Collapse>
            )
         })}
      </>
   )
}

export default Cluster
