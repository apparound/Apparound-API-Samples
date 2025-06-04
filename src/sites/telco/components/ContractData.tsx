import { Card } from '@/components/ui/card'
import ContractCustomerForm from '@/components/Customer/ContractCustomerForm'
import { useTranslation } from 'react-i18next'
import React from 'react'

interface ContractDataProps {
   className?: string
}

const SectionTitle = ({ text }: { text: string }) => {
   const { t } = useTranslation()
   return (
      <div className="w-full h-[40px] bg-[#F4F4F4] my-8 flex items-center">
         <div className="text-primary text-left font-bold ml-2 text-lg">{t(text)}</div>
      </div>
   )
}

const ContractData: React.FC<ContractDataProps> = ({ className = '' }) => {
   return (
      <div className={className}>
         <div className="text-primary text-center font-bold ml-2 mb-4 text-2xl">Contratto per attivazione offerta</div>
         <Card className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <ContractCustomerForm className="mt-4" />
            <SectionTitle text="Numero di telefono fisso" />
            <SectionTitle text="Documento" />
            <SectionTitle text="Modalità di pagamento" />
         </Card>
      </div>
   )
}

export default ContractData
