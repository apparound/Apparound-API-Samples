import { useDispatch, useSelector } from 'react-redux'
import { selectContract, selectCustomer } from '@/sites/retail/features/quoteSlice'
import ContractData from '../components/Contract/ContractData'
import Recap from '../components/Contract/Recap'
import { Button } from '@/components/ui/button'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { saveContractData } from '../components/Contract/hooks/saveContractData'
import TelcoContainer from '../components/TelcoContainer'
import React, { useRef } from 'react'
import { toast } from '@/components/ui/use-toast'

const Contract = props => {
   const navigate = useNavigate()
   const { t } = useTranslation()
   const location = useLocation()
   const dispatch = useDispatch()
   const contractData = useSelector(selectContract)
   const customerData = useSelector(selectCustomer)
   const readOnly = location.state?.readOnly ?? props.readOnly ?? false

   const contractDataRef = useRef<any>(null)

   // Determina il sottotitolo in base allo stato readOnly
   const subtitle = readOnly ? t('Contratto firmato e offerta attivata!') : t('Offerta confermata e inviata via email!')

   const concludeOffer = async () => {
      if (contractDataRef.current && contractDataRef.current.validateAll) {
         const valid = contractDataRef.current.validateAll()

         if (!valid) {
            toast({
               title: t('Attenzione'),
               description: t('Per favore compila tutti i campi obbligatori.'),
               variant: 'destructive',
            })
            return
         }
      }
      await saveContractData(contractData, customerData, dispatch)
      navigate('/telco/contract-signature')
   }

   return (
      <TelcoContainer subtitle={subtitle}>
         <div className="mx-4 mb-12 mt-14 flex flex-col lg:flex-row gap-6">
            <div className="lg:basis-[60%] min-w-0">
               <ContractData readOnly={readOnly} ref={contractDataRef} />
               <hr className="my-6 border-gray-300" />
               {!readOnly && (
                  <Button
                     className="min-w-[50%] max-w-[60%] bg-primary hover:bg-purple-700 rounded-3xl px-6"
                     onClick={() => concludeOffer()}
                  >
                     {t('Concludi attivazione').toUpperCase()}
                  </Button>
               )}
            </div>
            <div className="lg:basis-[40%] max-w-md w-full mx-auto">
               <Recap />
            </div>
         </div>
      </TelcoContainer>
   )
}

export default Contract
