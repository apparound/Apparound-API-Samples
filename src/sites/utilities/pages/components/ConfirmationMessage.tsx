import React from 'react'
import OffertaConfermata from '@/sites/utilities/assets/images/offerta-confermata.svg'

const ConfirmationMessage = ({ t }) => (
   <div className="flex justify-center">
      <div className="p-5 w-4/5 rounded-lg shadow-1app bg-[#e8efdb] flex flex-row justify-start items-center gap-3">
         <div className="[&>svg]:w-auto [&>svg]:h-20">
            <OffertaConfermata />
         </div>
         <div className="text-left">
            <div className="text-2xl font-bold">{t('Offerta confermata!')}</div>
            <div className="text-base">{t(`Controlla la casella email per scaricare il PDF dell'offerta`)}</div>
         </div>
      </div>
   </div>
)

export default ConfirmationMessage
