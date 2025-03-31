import React from 'react'
import PriceBox from './PriceBox'
import { calculatePrice } from '../../utils/priceCalculator'
import { mainServicesId } from '../../utils/constants'
import Icon from '@mdi/react'
import { mdiLightbulbOn10, mdiGasBurner } from '@mdi/js'
import luceGasImage from '@/assets/images/GasLuceSquare.jpg'
import luce from '@/assets/images/LuceSquare.jpg'
import gas from '@/assets/images/GasSquare.jpg'
import { hasMainProductId } from '@/utils/treeManager'

const InfoSection = () => {
   const showLuce = hasMainProductId(mainServicesId.LUCE)
   const showGas = hasMainProductId(mainServicesId.GAS)

   let description =
      'Include la fornitura di energia elettrica per la tua casa. Copre la fornitura di gas naturale per riscaldamento e usi quotidiani.'
   let imageSrc = luceGasImage
   if (showLuce && !showGas) {
      description = 'Include la fornitura di energia elettrica per la tua casa.'
      imageSrc = luce
   } else if (!showLuce && showGas) {
      description = 'Copre la fornitura di gas naturale per riscaldamento e usi quotidiani.'
      imageSrc = gas
   }

   return (
      <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
         <div className="bg-green-500 md:col-span-1 h-auto">
            <img src={imageSrc} alt="Luce e Gas" className="w-full h-full object-cover" />
         </div>
         <div className="md:col-span-2">
            <h2 className="text-primary text-2xl font-semibold text-left">Smart Casa</h2>
            <p className="text-gray-700 text-sm mt-2 text-left">{description}</p>
            <div className="flex flex-col md:flex-row justify-start mt-6 gap-4">
               {showLuce && (
                  <div className="w-full md:w-auto">
                     <PriceBox
                        title="Luce"
                        price={calculatePrice(mainServicesId.LUCE)}
                        icon={<Icon path={mdiLightbulbOn10} size={2} />}
                     />
                  </div>
               )}
               {showGas && (
                  <div className="w-full md:w-auto">
                     <PriceBox
                        title="Gas"
                        price={calculatePrice(mainServicesId.GAS)}
                        icon={<Icon path={mdiGasBurner} size={2} />}
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default InfoSection
