import { getAllMainProductsIds } from '@/utils/treeManager'
import { mainServicesId } from '@/sites/utilities/utils/constants'
import calculatePrice from '@/sites/utilities/utils/priceCalculator'
import { mdiLightbulbOn10, mdiGasBurner } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'react-i18next'

const ConsumptionItem = ({ id }) => {
   const { t } = useTranslation()
   return (
      <li className="flex items-center text-black">
         <Icon
            path={id == mainServicesId.LUCE ? mdiLightbulbOn10 : mdiGasBurner}
            size={2.5}
            className="mr-2 text-primary"
         />
         <div className="text-left">
            <span className="font-bold">{id == mainServicesId.LUCE ? t('Luce') : t('Gas')}</span>
            <div>
               {calculatePrice(id)} {id == mainServicesId.LUCE ? 'kWh' : 'm³'} {t("all'anno")}
            </div>
         </div>
      </li>
   )
}

const ConsumptionCard = ({ data }) => {
   const mainProductIds = getAllMainProductsIds()
   const { t } = useTranslation()

   return (
      <div className="flex flex-col items-center justify-center h-full text-white w-full h-full bg-[rgba(139,175,77,0.20)] mx-auto my-5 rounded-lg py-5">
         <h2 className="text-lg font-bold mb-4 text-black">{t('Il tuo consumo è in media:')}</h2>
         <ul className="flex space-x-8">
            {mainProductIds.map(id => (
               <ConsumptionItem key={id} id={id} />
            ))}
         </ul>
      </div>
   )
}

export default ConsumptionCard
