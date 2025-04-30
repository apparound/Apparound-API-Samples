import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@/sites/retail/components/Button'
import { useTranslation } from 'react-i18next'
import { saveContract } from '@/sites/retail/hooks/apparoundData'
import { selectContract, selectCustomer } from '@/sites/retail/features/quoteSlice'
import useRelativeNavigate from '@/utils/navigate'
import { hideLoader, showLoader } from '@/sites/retail/features/appSlice'

const Footer = ({ formRef }) => {
   const { t } = useTranslation()

   const navigate = useRelativeNavigate()

   const dispatch = useDispatch()

   const contractData = useSelector(selectContract)
   const customerData = useSelector(selectCustomer)

   const onSubmit = (e: any) => {
      e.preventDefault()
      if (!formRef.current.checkValidity()) {
         return formRef.current.reportValidity()
      }
      dispatch(showLoader())
      saveContract(contractData, customerData, dispatch)
   }

   useEffect(() => {
      if (contractData.id > -1) {
         navigate('/contract')
         dispatch(hideLoader())
      }
   }, [contractData.id])
   return (
      <div className="flex justify-center">
         <div className="w-full lg:w-[250px]">
            <Button onClick={onSubmit} disabled={false} label={t('Acquista ora')} variant={1} full={true} />
         </div>
      </div>
   )
}

export default Footer
