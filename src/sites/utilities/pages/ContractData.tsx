import { useEffect, useRef, useState } from 'react'
import Header from '@/sites/utilities/components/custom/Header'
import Footer from '@/components/Footer'
import Title from '@/sites/utilities/components/custom/texts/Title'
import MainContainer from '@/sites/utilities/components/custom/MainContainer'
import { useTranslation } from 'react-i18next'
import { Button } from '@/sites/utilities/components/ui/button'
import useRelativeNavigate from '@/utils/navigate'
import contractDataSchema from '@/sites/utilities/models/contractData'
import pwDataSchema from '@/sites/utilities/models/pwData'
import { getContract, getPw, getTree, saveContract } from '@/utils/treeManager'
import ConfirmationMessage from './components/ConfirmationMessage'
import ContractForm from './components/ContractForm'
import PwForm from './components/PwForm'
import StickyOffer from './components/StickyOffer'

interface contractDataI {
   id?: number
   properties?: {
      [key: string]: string | number | boolean
   }
   pod?: string
   pdr?: string
}

const ContractData = () => {
   const navigate = useRelativeNavigate()
   const contractRef = useRef(null)
   const tree = getTree()
   const { t } = useTranslation()
   const contract = getContract()
   const pw = getPw()
   const savedContractData = JSON.parse(localStorage.getItem('customerData')) || {}

   const mapSavedContractData = savedData => {
      const mapping = {
         firstName: 'firstName',
         lastName: 'lastName',
         customEmailMandatory: 'email',
         customPhoneMandatory: 'customPhoneMandatory',
         addressContract_province: 'customAddress_province',
         addressContract_city: 'customAddress_city',
         addressContract_zipCode: 'customAddress_zipCode',
         addressContract_address: 'customAddress_address',
      }

      if (!savedData) return {}

      return Object.entries(mapping).reduce((acc, [to, from]) => {
         return {
            ...acc,
            [to]: savedData[from],
         }
      }, {})
   }

   const [contractData, setContractData] = useState<contractDataI>({
      ...contract,
      properties: {
         ...contract.properties,
         ...mapSavedContractData(savedContractData),
      },
   })

   const [pwData, setPwData] = useState<contractDataI>(pw)
   const [showErrorToast, setShowErrorToast] = useState(true)

   const onChange = (value, name) => {
      setContractData({
         ...contractData,
         properties: {
            ...contractData.properties,
            [name]: value,
         },
      })
   }

   const onChangePw = (value, name) => {
      setPwData({
         ...pwData,
         [name]: value,
      })
   }

   const onSubmitContract = async e => {
      e.preventDefault()
      if (!contractRef.current.checkValidity()) {
         return contractRef.current.reportValidity()
      }

      const letturaPODRegex = /^IT\d{3}E\d{8}[A-Z0-9]?$/
      const letturaPDRRegex = /^\d{14}$/

      if (pwData.pod && !letturaPODRegex.test(pwData.pod)) {
         setShowErrorToast(true)
         return alert(t('errorePOD'))
      }

      if (pwData.pdr && !letturaPDRRegex.test(pwData.pdr)) {
         setShowErrorToast(true)
         return alert(t('errorePDR'))
      }

      const currentContract = await saveContract(contractData, pwData)

      setContractData(currentContract)

      navigate('/contract-signature')
   }

   useEffect(() => {
      console.log(contractData, pwData)
   }, [contractData, pwData])
   return (
      <>
         <div className="min-h-screen flex flex-col justify-center max-h-screen overflow-hidden">
            <Header step={2} />
            <MainContainer>
               <form className="container" ref={contractRef}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-20 w-full flex-1">
                     <div className="col-span-1 lg:col-span-3 flex flex-col lg:gap-8 mb-10">
                        <ConfirmationMessage t={t} />
                        <Title textKey={t('Contratto per attivazione offerta')} />
                        <ContractForm
                           contractDataSchema={contractDataSchema}
                           onChange={onChange}
                           contractData={contractData}
                        />
                        {tree.map((cluster, index) => (
                           <PwForm
                              key={index}
                              pwDataSchema={pwDataSchema[cluster.label]}
                              onChangePw={onChangePw}
                              pwData={pwData}
                           />
                        ))}
                        <hr className="w-full mt-5 hidden lg:block" />
                        <div className="text-center hidden lg:block">
                           <Button
                              onClick={onSubmitContract}
                              className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all uppercase"
                           >
                              {t('Genera contratto')}
                           </Button>
                        </div>
                     </div>
                     <StickyOffer t={t} />
                     <div className="col-span-1 lg:col-span-3 flex flex-col gap-8 mb-10 lg:hidden">
                        <hr className="w-full mt-5" />
                        <div className="text-center">
                           <Button
                              onClick={onSubmitContract}
                              className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all uppercase"
                           >
                              {t('Genera contratto')}
                           </Button>
                        </div>
                     </div>
                  </div>
               </form>
            </MainContainer>
            <Footer />
         </div>
      </>
   )
}

export default ContractData
