import { useDispatch, useSelector } from 'react-redux'
import { selectContract, selectCustomer } from '@/sites/retail/features/quoteSlice'
import ContractData from '../components/Contract/ContractData'
import Recap from '../components/Contract/Recap'
import { Button } from '@/components/ui/button'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { saveContractData } from '../components/Contract/hooks/saveContractData'
import TelcoContainer from '../components/TelcoContainer'
import { useRef, useState, useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'

const Contract = props => {
   const navigate = useNavigate()
   const { t } = useTranslation()
   const location = useLocation()
   const dispatch = useDispatch()
   const contractData = useSelector(selectContract)
   const customerData = useSelector(selectCustomer)
   const readOnly = location.state?.readOnly ?? props.readOnly ?? false
   const [offerTitle, setOfferTitle] = useState<string>('')

   const contractDataRef = useRef<any>(null)

   useEffect(() => {
      const OFFER_TITLE_STORAGE_KEY = 'telco:offerTitle'
      const storedOfferTitle = localStorage.getItem(OFFER_TITLE_STORAGE_KEY)
      if (storedOfferTitle) {
         setOfferTitle(storedOfferTitle)
      }
   }, [])

   // Scroll to top when component mounts
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   const subtitle = readOnly ? t('Contratto firmato e offerta attivata!') : t('Offerta confermata e inviata via email!')

   const concludeOffer = async () => {
      if (contractDataRef.current && contractDataRef.current.validateAll) {
         const valid = contractDataRef.current.validateAll()

         if (!valid) {
            toast({
               title: '',
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
      <>
         <TelcoContainer subtitle={subtitle} step={readOnly ? 5 : 3} offerTitle={offerTitle}>
            <div className="mx-4 mb-12 mt-14 flex flex-col lg:flex-row gap-6">
               <div className="lg:basis-[40%] max-w-md w-full mx-auto lg:order-2">
                  <Recap />
               </div>

               {/* ContractData dopo su mobile, poi a sinistra su desktop */}
               <div className="lg:basis-[60%] min-w-0 lg:order-1">
                  <ContractData readOnly={readOnly} ref={contractDataRef} />
                  {!readOnly && (
                     <Button
                        className="min-w-[250px] bg-primary hover:bg-purple-700 rounded-3xl px-6 mt-8"
                        onClick={() => concludeOffer()}
                     >
                        {t('Concludi attivazione').toUpperCase()}
                     </Button>
                  )}
               </div>
            </div>
         </TelcoContainer>
      </>
   )
}

export default Contract
