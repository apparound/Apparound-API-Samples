import { Service } from '@/sites/utilities/components/custom/ServiceSelector'
import consumptionPrices from './consumptionPrices.json'
import { mainServicesId } from './constants'

export const calculatePrice = (productId: Number): number => {
   const surfaceArea = localStorage.getItem('surfaceArea')
   const houseHeatingType = localStorage.getItem('selectedHouseHeatingType')
   const waterHeatingType = localStorage.getItem('selectedWaterHeatingType')

   const surfaceIndex = consumptionPrices.superficieEnum[surfaceArea]
   const heatingIndex = consumptionPrices.riscaldamentoEnum[houseHeatingType]
   const waterHeatingIndex = consumptionPrices.acquaCaldaEnum[waterHeatingType]

   const priceType = productId == mainServicesId.LUCE ? 'elettrico' : 'gas'
   return consumptionPrices.data[surfaceIndex][heatingIndex][waterHeatingIndex][priceType]
}

export default calculatePrice
