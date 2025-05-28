import React from 'react'
import { mdiPlusCircle } from '@mdi/js'
import Button from '@/sites/retail/components/Button'

interface ProductRowProps {
   product: any
   isLast: boolean
}

const ProductRow: React.FC<ProductRowProps> = ({ product, isLast }) => (
   <>
      <div className="flex items-center justify-between py-2 px-1">
         <div className="flex items-center gap-3">
            {/* {ProductIcon.get(product.label.toLowerCase())} */}
            <div className="font-light text-gray-900">{product.label}</div>
         </div>
         <div className="flex items-center gap-2 min-w-[80px] font-semibold text-gray-700 justify-end">
            {product.price && product.price > 0
               ? product.price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'EUR',
                 })
               : 'Incluso'}
            <Button
               className="w-full bg-white focus:outline-none"
               onClick={() => console.log('Add product')}
               leftIcon={{
                  path: mdiPlusCircle,
                  size: 1.4,
                  className: 'text-primary',
               }}
            />
         </div>
      </div>
      {!isLast && <hr className="my-2 border-gray-200" />}
   </>
)

export default ProductRow
