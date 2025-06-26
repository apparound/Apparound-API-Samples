import React from 'react'
import SectionTitle from '../SectionTitle'
import { useTranslation } from 'react-i18next'

interface PaymentMethodProps {
   value: number
   label: string
   description: string
   checked: boolean
   onChange: (value: number) => void
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ value, label, description, checked, onChange }) => (
   <label className="flex items-start gap-2 cursor-pointer mb-4">
      <input
         type="radio"
         name="paymentMethod"
         value={value}
         checked={checked}
         onChange={() => onChange(value)}
         className="mt-1 accent-purple-700"
      />
      <div>
         <div className="font-bold text-base text-left text-black leading-tight">{label}</div>
         <div className="text-sm text-black leading-tight">{description}</div>
      </div>
   </label>
)

interface PaymentMethodsProps {
   value: number
   onChange: (value: number) => void
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ value, onChange }) => {
   const { t } = useTranslation()
   return (
      <div>
         <SectionTitle text="Metodo di pagamento" />
         <PaymentMethod
            value={1}
            label={t('Bollettino postale')}
            description={t('Pagamento manuale presso poste, tabaccherie o online')}
            checked={value === 1}
            onChange={onChange}
         />
         <PaymentMethod
            value={2}
            label={t('SEPA')}
            description={t('Addebito automatico sul conto corrente alla scadenza')}
            checked={value === 2}
            onChange={onChange}
         />
      </div>
   )
}

export default PaymentMethods
