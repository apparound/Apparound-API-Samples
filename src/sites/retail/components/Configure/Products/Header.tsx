import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '@/sites/retail/components/Button'
import Title from '@/sites/retail/components/Collapse/Title'
import { selectCartClusters } from '@/sites/retail/features/quoteSlice'

const Header = () => {
   const navigate = useNavigate()
   const { t } = useTranslation()
   const cartClusters = useSelector(selectCartClusters)
   return (
      <div className="w-full border-[#DCE1E6] border-b-2">
         <Title
            title={cartClusters.mainCluster.shortName}
            info={{ label: cartClusters.selectedSize.label }}
            action={
               <Button
                  label={t('Modifica')}
                  onClick={() => {
                     navigate(-1)
                  }}
                  variant={5}
               />
            }
         />
      </div>
   )
}

export default Header
