import React from 'react'
import Card from '@/sites/utilities/components/custom/Card'
import Section from '@/sites/utilities/components/custom/Card/Section'
import SectionTitle from '@/sites/utilities/components/custom/Card/Section/Title'
import { mdiLightbulbOnOutline, mdiGasBurner } from '@mdi/js'
import Info from '@/sites/utilities/components/custom/Card/Section/Info/Info'
import { useTranslation } from 'react-i18next'
import Customer from '@/sites/utilities/components/custom/CartSignature/Contract/Customer'
import { getContract, getTree } from '@/utils/treeManager'
import Cluster from '@/sites/utilities/components/custom/CartSignature/Contract/Cluster'
import { billSendingMethod, paymentType } from '@/sites/utilities/models/contractData'

interface ContractProps {}

const Contract = ({}: ContractProps) => {
   const { t } = useTranslation()
   const tree = getTree()
   const contract = getContract().properties
   const billSendingMethodModel = billSendingMethod.children.find(
      item => item.value === contract.headlessBillSendingMethod
   )
   const paymentTypeModel = paymentType.children.find(item => item.value === contract.headlessPaymentType)
   return (
      <Card className="lg:w-3/4">
         <Customer />
         <Section className={'mb-6'}>
            <SectionTitle title={t('Metodo invio bolletta')} />
            <div className="py-4">
               <Info variant={2} label={t(billSendingMethodModel.label)} info={t(billSendingMethodModel.info)} />
            </div>
         </Section>
         <Section className={'mb-6'}>
            <SectionTitle title={t('Metodo di pagamento')} />
            <div className="py-4">
               <Info variant={2} label={t(paymentTypeModel.label)} info={t(paymentTypeModel.info)} />
            </div>
         </Section>
         <Section>
            <SectionTitle title={t('Informazioni fornitura')} />
            {tree.map((cluster, index) => {
               return <Cluster cluster={cluster} showDivider={!!index} key={index} />
            })}
         </Section>
      </Card>
   )
}

export default Contract
