import { Card } from '@/components/ui/card'
import ContractCustomerForm from '@/components/Customer/ContractCustomerForm'
import SectionTitle from '../SectionTitle'
import PaymentMethods from './PaymentMethods'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import DocumentData from './DocumentData'
import { useSelector } from 'react-redux'
import { selectContract, selectCustomer } from '@/sites/retail/features/quoteSlice'

interface ContractDataProps {
   className?: string
}

const ContractData: React.FC<ContractDataProps> = ({ className = '' }) => {
   const { t } = useTranslation()
   const [paymentMethod, setPaymentMethod] = useState('SEPA')
   const contract = useSelector(selectContract)
   const customer = useSelector(selectCustomer)

   return (
      <div className={className}>
         <div className="text-primary text-center font-bold ml-2 mb-4 text-2xl">Contratto per attivazione offerta</div>
         <Card className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <ContractCustomerForm className="mt-4" />
            <SectionTitle text="Numero di telefono fisso" />
            <DocumentData />
            <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />
         </Card>
      </div>
   )
}

export default ContractData
