import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Title from '@/sites/retail/components/Title'
import Recap from '@/sites/retail/components/Cart/Recap'
import TitleForm from '@/sites/retail/components/Form/Title'
import { selectContractProperties, selectMainProduct } from '@/sites/retail/features/quoteSlice'
import ContractIcon from '@/sites/retail/assets/images/retail_messaggio-conferma.svg'
import { getShippingDate } from '@/utils/utils'

const Contract: React.FC = () => {
   const { t, i18n } = useTranslation()

   const contract = useSelector(selectContractProperties)
   const mainProduct = useSelector(selectMainProduct)
   const shippingDate = getShippingDate(i18n)

   return (
      <div className="flex flex-col h-full">
         <div className="bg-[#F4F4F4] py-4">
            <Title title={t('Riepilogo')} size={3} />
         </div>
         <div className="flex-1 overflow-y-auto py-10">
            <div className="container">
               <div className="flex flex-col gap-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                     <div className="col-span-8 lg:col-start-3 flex flex-col gap-6 lg:text-left">
                        <div className="flex flex-col items-center lg:flex-row rounded-[4px] py-6 px-10 bg-primary/20 gap-6">
                           <div className="w-40">
                              <ContractIcon />
                           </div>
                           <div>
                              <div className="font-bold text-xl">
                                 {t('Grazie per aver acquistato la tua nuova {{productName}} personalizzata!', {
                                    productName: mainProduct.label,
                                 })}
                              </div>
                              <div className="text-lg">
                                 <span className="italic">{t('Consegna stimata')}:</span> {shippingDate}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <Recap />
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                     <div className="col-span-8 lg:col-start-3 flex flex-col gap-6 text-left">
                        <div className="flex flex-col gap-4">
                           <TitleForm label={t('Spedizione a')} />
                           <div className="border-2 p-4 flex flex-col gap-4 rounded">
                              <div className="font-bold">
                                 {contract.firstName} {contract.lastName}
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                 <div>{contract.customEmailMandatory}</div>
                                 <div>{contract.customPhoneMandatory}</div>
                              </div>
                              <div>
                                 <div>{contract.addressContract_address}</div>
                                 <div>
                                    {contract.addressContract_zipCode} {contract.addressContract_city},{' '}
                                    {contract.addressContract_province}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col gap-4">
                           <TitleForm label={t('Indirizzo di fatturazione')} />
                           <div className="border-2 p-4 flex flex-col gap-4 rounded">
                              <div>
                                 <div>{contract.billingAddress_address}</div>
                                 <div>
                                    {contract.billingAddress_zipCode} {contract.billingAddress_city},{' '}
                                    {contract.billingAddress_province}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Contract
