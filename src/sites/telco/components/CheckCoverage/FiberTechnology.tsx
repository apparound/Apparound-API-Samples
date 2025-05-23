import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@mdi/react'
import { mdiDownload, mdiUpload } from '@mdi/js'

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
      <div className="mt-8 flex items-center bg-[#f6f6f8] rounded-2xl shadow p-6">
         <div className="flex-shrink-0 mr-6">
            <img
               src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=400&h=300"
               alt="FTTC"
               className="rounded-xl w-48 h-32 object-cover"
            />
         </div>
         <div>
            <div className="flex items-baseline gap-2">
               <h4 className="text-2xl font-bold text-[#7c4bc6]">{t('Tecnologia FTTC Fiber to the Cabinet')}</h4>
            </div>
            <div className="flex gap-8 my-8">
               <Info
                  icon={<Icon path={mdiDownload} size={1.2} color="#7c4bc6" />}
                  label="Download"
                  value={t('Velocità FTTC download')}
               />
               <Info
                  icon={<Icon path={mdiUpload} size={1.2} color="#7c4bc6" />}
                  label="Upload"
                  value={t('Velocita FTTC upload')}
               />
            </div>
            <div className="text-black mt-2 text-left">
               {t("Fibra fino all'armadio stradale e rame fino a casa. Buon compromesso tra velocità e copertura.")}
            </div>
         </div>
      </div>
   )
}

export default FiberTechnology
