import React, { useState } from 'react'
import { addProduct, deleteProduct, setProductQuantity } from '@/sites/telco/hooks/apparoundData'
import ProductIcon from './ProductIcon'

interface Product {
   guid: string
   description: string
   parentGuid: string
   config: any
}
interface QuantitySwitchProps {
   product: Product
   value: number
   dispatch: any
   tofId: any
}

const QuantitySwitch: React.FC<QuantitySwitchProps> = ({ product, value, dispatch, tofId }) => {
   const [internalValue, setInternalValue] = useState<number>(value)
   const [isAdding, setIsAdding] = useState(false)
   const lastQueuedValue = React.useRef<number | null>(null)

   const handleChange = async (newVal: number) => {
      const prevVal = internalValue
      setInternalValue(newVal)

      if (prevVal === 0 && newVal > 0) {
         if (isAdding) {
            lastQueuedValue.current = newVal
            return
         }
         setIsAdding(true)
         await addProduct(product.guid, dispatch, tofId, product.parentGuid)
         console.log(`Added product ${product.guid} with parent ${product.parentGuid}`)
         setIsAdding(false)

         if (lastQueuedValue.current !== null) {
            await setProductQuantity(product.guid, lastQueuedValue.current, dispatch)
            lastQueuedValue.current = null
         } else {
            await setProductQuantity(product.guid, newVal, dispatch)
         }
      } else if (isAdding) {
         lastQueuedValue.current = newVal
      } else if (newVal > 0) {
         await setProductQuantity(product.guid, newVal, dispatch)
      } else {
         await deleteProduct(product.guid, dispatch)
      }
   }

   return (
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl w-full max-w-3xl shadow-md">
         <div className="flex items-center gap-3">
            {ProductIcon.getByIconName(product.config.mdiIcon, 'w-8 h-8')}
            <span className="text-black text-lg">{product.description}</span>
         </div>
         <input
            type="number"
            min={0}
            value={internalValue}
            onChange={e => handleChange(Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded text-center"
         />
      </div>
   )
}

export default QuantitySwitch
