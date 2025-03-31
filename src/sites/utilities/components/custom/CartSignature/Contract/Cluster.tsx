import React from 'react'
import { mdiLightbulbOnOutline, mdiGasBurner } from '@mdi/js'
import Info from '@/sites/utilities/components/custom/Card/Section/Info/Info'
import { useTranslation } from 'react-i18next'
import Icon from '@mdi/react'
import { getPw } from '@/utils/treeManager'

interface ClusterProps {
   showDivider: boolean
   cluster: any
}

interface infoI {
   type: string
   consumptions: string
}

const Cluster = ({ showDivider, cluster }: ClusterProps) => {
   const { t } = useTranslation()

   const pwData = getPw()

   const isLuce: boolean = cluster.label === 'Luce'
   const infos: infoI[] = [
      {
         type: 'POD',
         consumptions: 'kWh',
      },
      {
         type: 'PDR',
         consumptions: 'm3',
      },
   ]
   const info: infoI = infos[isLuce ? 0 : 1]
   return (
      <div className="w-full">
         {showDivider ? <hr className="w-full" /> : null}
         <div className="flex items-center py-4 gap-4">
            <div className="flex flex-col text-primary">
               <div>
                  <Icon path={cluster.label === 'Luce' ? mdiLightbulbOnOutline : mdiGasBurner} size={3} />
               </div>
               <div className="font-semibold text-lg leading-4">{cluster.label}</div>
            </div>
            <div className="flex flex-col gap-4">
               <Info label={info.type} info={pwData[info.type.toLowerCase()]} />
               <Info label={`${t('Lettura contatore')} (${info.consumptions})`} info={pwData[`lettura${info.type}`]} />
            </div>
         </div>
      </div>
   )
}

export default Cluster
