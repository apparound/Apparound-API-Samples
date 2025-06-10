import { useEffect, useRef, useState } from 'react'
import Modal from '@/components/Modal'
import { createCustomer } from '@/utils/treeManager'
import useRelativeNavigate from '@/utils/navigate'
import CustomerForm from './Form'
import CustomerFooter from './Footer'
import { useTranslation } from 'react-i18next'

const CustomerModal = ({ showModal, setShowModal }) => {
   const navigate = useRelativeNavigate()
   const formRef = useRef(null)
   const [customerData, setCustomerData] = useState({})
   const [formIsValid, setFormIsValid] = useState(false)
   const { t } = useTranslation()

   useEffect(() => {
      setFormIsValid(formRef.current?.checkValidity() || false)
   }, [customerData])

   const onSubmit = async () => {
      if (!formRef.current?.checkValidity()) {
         return formRef.current?.reportValidity()
      }

      try {
         await createCustomer(customerData)

         navigate('/contract-data')
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <Modal
         title={t('Richiedi attivazione')}
         showModal={showModal}
         setShowModal={setShowModal}
         body={
            <CustomerForm
               ref={formRef}
               customerData={customerData}
               onChange={(value, name) => setCustomerData({ ...customerData, [name]: value })}
               formRef={formRef}
            />
         }
         footer={<CustomerFooter setShowModal={setShowModal} onSubmit={onSubmit} />}
      />
   )
}

export default CustomerModal
