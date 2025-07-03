import React, { useEffect, useState } from 'react'
import { getAddons } from '@/sites/telco/pages/getAddons'
import { useSelector } from 'react-redux'
import {
   selectCart,
   selectFlatCart,
   selectMainProduct,
   selectQuotePrice,
   selectTree,
} from '@/sites/retail/features/quoteSlice'
import { useTranslation } from 'react-i18next'
import { getProductPriceString } from '@/utils/utils'

interface RecapProductListProps {}

const AddonTitle: React.FC<{ label: string }> = ({ label }) => (
   <span className="font-semibold text-left text-lg truncate w-full">{label}</span>
)

const ProductRow: React.FC<{ label: string; price?: number; product?: any }> = ({ label, price, product }) => {
   let priceString = ''
   if (product) {
      priceString = getProductPriceString(product)
   } else if (price !== undefined) {
      priceString = price % 1 === 0 ? `${price},00` : price.toFixed(2).replace('.', ',') + ' €'
   }
   return (
      <li className="flex items-center text-base list-none p-0 m-0 gap-2 min-w-0 w-full">
         <span className="truncate max-w-full text-left flex-1">{label}</span>
         {priceString && <span className="flex-shrink-0 whitespace-nowrap text-right min-w-[80px]">{priceString}</span>}
      </li>
   )
}

const RecapProductList: React.FC<RecapProductListProps> = () => {
   const tree = useSelector(selectTree)
   const cart = useSelector(selectCart)
   const flatCart = useSelector(selectFlatCart)
   const quotePrice = useSelector(selectQuotePrice)
   const { t } = useTranslation()
   const mainProduct = useSelector(selectMainProduct)
   const [products, setProducts] = useState([])
   const [offerTitle, setOfferTitle] = useState('')
   const [addons, setAddons] = useState([])

   useEffect(() => {
      if (mainProduct?.clusters) {
         const lastCluster = mainProduct.clusters[mainProduct.clusters.length - 1]
         const newProducts = lastCluster.products || []
         setProducts(newProducts)
         let newAddons = getAddons({ products: newProducts, cart, tree, quotePrice, setOfferTitle, t })

         newAddons = newAddons.map((addon: any) => {
            if (Array.isArray(addon.products)) {
               const filteredProducts = addon.products.filter((p: any) => {
                  if (p.label === t('Attivazione offerta')) return true
                  return !p.guid || flatCart.includes(p.guid)
               })
               return { ...addon, products: filteredProducts }
            }
            return addon
         })

         newAddons = newAddons.filter((addon: any) => {
            if (Array.isArray(addon.products)) {
               return addon.products.length > 0
            }
            return true
         })
         setAddons(newAddons)
      } else {
         setProducts([])
         setAddons([])
      }
   }, [mainProduct, cart, tree, quotePrice, setOfferTitle, t, flatCart])

   if (!addons.length) {
      return <div className="text-gray-500">Nessun prodotto disponibile</div>
   }

   return (
      <div className="flex px-4 flex-col">
         <ul className="divide-y divide-gray-200">
            {addons.map((addon: any, idx: number) => (
               <li key={addon.guid || addon.id || idx} className="py-2 flex flex-col">
                  <div className="flex w-full items-center min-w-0">
                     <AddonTitle label={addon.label || addon.description} />
                  </div>
                  {addon.products && Array.isArray(addon.products) && (
                     <ul className="pr-4 pb-2 mt-1 w-full">
                        {addon.products.map((p: any, i: number) => (
                           <ProductRow
                              key={p.guid || p.id || i}
                              label={p.label || p.description}
                              price={p.price}
                              product={p}
                           />
                        ))}
                     </ul>
                  )}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default RecapProductList
