import { useEffect, useRef, useState } from 'react'
import Modal from '@/components/Modal'
import { createCustomer } from '@/utils/treeManager'
import useRelativeNavigate from '@/utils/navigate'
import contactDataSchema from '@/sites/retail/models/contactData'
import Form from '@/sites/retail/components/Form'
import { useTranslation } from 'react-i18next'
import Footer from './Footer'
// import CustomerFooter from './Footer'

const CustomerModal = ({ showModal, setShowModal }) => {
    const { t } = useTranslation()
    const navigate = useRelativeNavigate()
    const formRef = useRef(null)
    const [customerData, setCustomerData] = useState({})
    const [formIsValid, setFormIsValid] = useState(false)

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
            title={t('Invia configurazione')}
            showModal={showModal}
            setShowModal={setShowModal}
            body={(
                <form ref={formRef}>
                    <Form children={contactDataSchema} values={customerData} onChange={(value, name) => setCustomerData({ ...customerData, [name]: value })} />
                </form>
            )}
            footer={<Footer setShowModal={setShowModal} onSubmit={onSubmit} formIsValid={formIsValid} />}
        />
    )
}

export default CustomerModal
