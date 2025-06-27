import { Card } from '@/components/ui/card'
import ContractCustomerForm from '@/components/Customer/ContractCustomerForm'
import PaymentMethods from './PaymentMethods'
import { useTranslation } from 'react-i18next'
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import DocumentData from './DocumentData/DocumentData'
import { useSelector, useDispatch } from 'react-redux'
import { selectContract, updateContractProperties } from '@/sites/retail/features/quoteSlice'
import PhoneNumberPortability from './PhoneNumber/PhoneNumberPortability'

interface ContractDataProps {
   className?: string
   readOnly?: boolean
}

const ContractData = forwardRef<unknown, ContractDataProps>(({ className = '', readOnly = false }, ref) => {
   const [paymentMethod, setPaymentMethod] = useState(0)
   const contract = useSelector(selectContract)
   const dispatch = useDispatch()
   const { t } = useTranslation()

   const customerFormRef = useRef<any>(null)
   const documentDataRef = useRef<any>(null)
   const phoneNumberRef = useRef<any>(null)

   const handlePaymentMethodChange = (value: number) => {
      setPaymentMethod(value)
      dispatch(updateContractProperties({ headlessPaymentType: value }))
      console.log('Contract:', contract)
   }

   const validateAll = () => {
      let valid = true
      if (customerFormRef.current && customerFormRef.current.validate) {
         valid = customerFormRef.current.validate() && valid
      }
      if (documentDataRef.current && documentDataRef.current.validate) {
         valid = documentDataRef.current.validate() && valid
      }
      if (phoneNumberRef.current && phoneNumberRef.current.validate) {
         valid = phoneNumberRef.current.validate() && valid
      }
      if (!paymentMethod) {
         valid = false
      }
      return valid
   }

   useImperativeHandle(ref, () => ({
      validateAll,
   }))

   return (
      <div className={className}>
         <div className="text-primary text-center font-bold ml-2 mb-4 text-2xl">
            {t('Contratto per attivazione offerta')}
         </div>
         <Card className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <ContractCustomerForm className="mt-4" readOnly={readOnly} ref={customerFormRef} />
            <PhoneNumberPortability ref={phoneNumberRef} />
            <DocumentData readonly={readOnly} ref={documentDataRef} />
            <PaymentMethods value={paymentMethod} onChange={handlePaymentMethodChange} />
         </Card>
      </div>
   )
})

export default ContractData
