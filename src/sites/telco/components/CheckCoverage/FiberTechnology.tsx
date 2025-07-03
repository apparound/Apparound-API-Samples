import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@mdi/react'
import { mdiDownload, mdiUpload } from '@mdi/js'
import fttcImage from '@/sites/telco/assets/images/fttc_image.png'

const Info = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
   <div className="flex flex-row items-center gap-3 text-left">
      <span className="flex items-center justify-center" style={{ minWidth: 32, minHeight: 32 }}>
         {icon}
      </span>
      <div className="flex flex-col text-left">
         <span className="font-bold text-black leading-none text-left">{label}</span>
         <span className="text-black leading-none text-left">{value}</span>
      </div>
   </div>
)

const FiberTechnology = () => {
   const { t } = useTranslation()
   return (
      <div className="mt-8 flex flex-col sm:flex-row items-center bg-[#f6f6f8] rounded-2xl p-4 sm:p-6">
         <div className="w-full sm:w-1/2 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <img src={fttcImage} alt="FTTC" className="rounded-xl w-full h-56 object-contain bg-none" />
         </div>
         <div className="w-full sm:w-1/2">
            <div className="flex items-baseline gap-2">
               <h4 className="text-xl sm:text-2xl font-bold text-primary">
                  {t('Tecnologia FTTC Fiber to the Cabinet')}
               </h4>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 my-4 sm:my-8">
               <Info
                  icon={
                     <span className="text-primary">
                        <Icon path={mdiDownload} size={1.2} />
                     </span>
                  }
                  label="Download"
                  value={t('Velocità FTTC download')}
               />
               <Info
                  icon={
                     <span className="text-primary">
                        <Icon path={mdiUpload} size={1.2} />
                     </span>
                  }
                  label="Upload"
                  value={t('Velocita FTTC upload')}
               />
            </div>
            <div className="text-black mt-2 text-left text-sm sm:text-base">
               {t("Fibra fino all'armadio stradale e rame fino a casa. Buon compromesso tra velocità e copertura.")}
            </div>
         </div>
      </div>
   )
}

export default FiberTechnology
