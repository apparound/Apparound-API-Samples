import { useEffect, useRef, useState } from 'react'
import Modal from '@/components/Modal'
import useRelativeNavigate from '@/utils/navigate'
import CustomerForm from '@/components/Customer/Form'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '@/sites/retail/features/appSlice'
import { selectContract, selectCustomer } from '@/sites/retail/features/quoteSlice'
import { saveContract } from '../hooks/apparoundData'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const CustomerModal = ({ showModal, setShowModal }) => {
   const navigate = useRelativeNavigate()
   const formRef = useRef(null)
   const [formIsValid, setFormIsValid] = useState(false)
   const dispatch = useDispatch()

   const contractData = useSelector(selectContract)
   const fullCustomerData = useSelector(selectCustomer)
   const [customerData, setCustomerData] = useState([])

   const handleCustomerDataChange = (value, name) => {
      if (!formRef.current) return
      if (!fullCustomerData || !fullCustomerData.hasOwnProperty(name)) {
         setCustomerData(prevData => ({
            ...prevData,
            [name]: value,
         }))
         return
      }
      setCustomerData(prevData => ({
         ...prevData,
         [name]: value,
      }))
   }

   useEffect(() => {
      setFormIsValid(formRef.current?.checkValidity() || false)
   }, [customerData])

   const onSubmit = () => {
      if (!formRef.current.checkValidity()) {
         return formRef.current.reportValidity()
      }
      dispatch(showLoader())
      saveContract(contractData, customerData, dispatch)
      setShowModal(false)
   }

   useEffect(() => {
      if (contractData.id > -1) {
         navigate('/contract')
         dispatch(hideLoader())
      }
   }, [contractData.id])

   const { t } = useTranslation()

   return (
      <>
         <Modal
            title={t('Richiedi attivazione')}
            showModal={showModal}
            setShowModal={setShowModal}
            body={
               <CustomerForm
                  ref={formRef}
                  customerData={customerData}
                  onChange={handleCustomerDataChange}
                  formRef={formRef}
                  onSubmit={onSubmit}
               />
            }
            footer={<CustomerFooter onSubmit={onSubmit} />}
         />
         <CustomerFooter onSubmit={onSubmit} />
      </>
   )
}

// CustomerFooter come componente locale
const CustomerFooter = ({ onSubmit }) => {
   const { t } = useTranslation()
   return (
      <div className="flex justify-center">
         <div className="flex w-full lg:w-[250px] justify-center align-center">
            <Button className="w-[80%] bg-primary hover:bg-purple-700 rounded-3xl px-6" onClick={onSubmit}>
               {t('Invia')}
            </Button>
         </div>
      </div>
   )
}

export default CustomerModal
