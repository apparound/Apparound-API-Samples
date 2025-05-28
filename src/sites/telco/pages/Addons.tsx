import React from 'react'
import { Card } from '@/components/ui/card'
import AddonCluster from '@/sites/telco/components/Addons/AddonCluster'
import { useTranslation } from 'react-i18next'

interface AddonsProps {
   addons: any[]
}

const Addons: React.FC<AddonsProps> = ({ addons }) => {
   const { t } = useTranslation()

   return (
      <div className="max-w-2xl mx-auto my-10">
         <h2 className="text-2xl font-bold text-center text-primary mb-8">{t('Dettagli offerta')}</h2>
         <div className="space-y-8">
            {addons.map((cluster: any) => (
               <AddonCluster key={cluster.id} cluster={cluster} />
            ))}
         </div>
      </div>
   )
}

export default Addons
