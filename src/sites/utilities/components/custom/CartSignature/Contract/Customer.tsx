import React from 'react'
import Section from '@/sites/utilities/components/custom/Card/Section'
import SectionTitle from '@/sites/utilities/components/custom/Card/Section/Title'
import { getContract } from '@/utils/treeManager'
import { mdiLightbulbOnOutline } from '@mdi/js'
import Info, { InfoProps } from '@/sites/utilities/components/custom/Card/Section/Info/Info'
import { useTranslation } from 'react-i18next'

interface CustomerProps {}

const Customer = ({}: CustomerProps) => {
   const { t } = useTranslation()
   const contract = getContract().properties
   const customer: InfoProps[] = [
      {
         label: t('Nome'),
         info: contract.firstName || '-',
      },
      {
         label: t('Cognome'),
         info: contract.lastName || '-',
         className: 'col-span-2',
      },
      {
         label: t('Email'),
         info: contract.customEmailMandatory || '-',
      },
      {
         label: t('Telefono'),
         info: contract.customPhoneMandatory || '-',
      },
      {
         variant: 2,
         label: t('Indirizzo'),
         className: 'col-span-3',
      },
      {
         label: t('Provincia'),
         info: contract.addressContract_province || '-',
      },
      {
         label: t('Comune'),
         info: contract.addressContract_city || '-',
      },
      {
         label: t('CAP'),
         info: contract.addressContract_zipCode || '-',
      },
      {
         label: t('Indirizzo e numero civico'),
         info: contract.addressContract_address || '-',
      },
   ]
   return (
      <Section className={'mb-6'}>
         <SectionTitle title="Dati intestatario fornitura" />
         <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 py-4">
            {customer.map((item: InfoProps, index) => {
               return <Info {...item} key={index} />
            })}
         </div>
      </Section>
   )
}

export default Customer
