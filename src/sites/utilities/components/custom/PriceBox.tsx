import React from 'react'
import { useTranslation } from 'react-i18next'

const PriceBox = ({ title, price, icon }) => {
   const { t } = useTranslation()

   return (
      <div className="flex flex-col items-center bg-[#F4F4F4] rounded-[4px] w-full md:w-40 p-4 shadow-sm">
         <div className="flex items-center text-4xl text-primary mb-2">
            {icon}
            <h2 className="text-gray-800 text-xl font-bold ml-2">{t(title)}</h2>
         </div>
         <hr className="w-full border-[#DCE1E6] my-2" style={{ borderWidth: '1px' }} />
         <p className="text-black text-lg font-semibold mt-1 whitespace-nowrap">
            {price.toFixed(2)} {t('€/mese')}
         </p>{' '}
      </div>
   )
}

export default PriceBox
