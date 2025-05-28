import React, { useState } from 'react'
import { addProduct, deleteProduct, setProductQuantity } from '@/sites/telco/hooks/apparoundData'
import { mdiSim } from '@mdi/js'
import Icon from '@mdi/react'

interface Product {
   guid: string
   description: string
   parentGuid: string
}
interface SimSwitchProps {
   product: Product
   value: number
   dispatch: any
   tofId: any
}

const SimSwitch: React.FC<SimSwitchProps> = ({ product, value, dispatch, tofId }) => {
   const [internalValue, setInternalValue] = useState<number>(value)

   const handleChange = async (newVal: number) => {
      const prevVal = internalValue
      setInternalValue(newVal)

      if (prevVal === 0 && newVal > 0) {
         await addProduct(product.guid, dispatch, tofId, product.parentGuid)
      }

      if (newVal > 0) {
         await setProductQuantity(product.guid, newVal, dispatch)
      } else {
         await deleteProduct(product.guid, dispatch)
      }
   }

   return (
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl w-full max-w-3xl shadow-md">
         <div className="flex items-center gap-3">
            <Icon path={mdiSim} size={1.4} color="#7c4bc6" />
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

export default SimSwitch
