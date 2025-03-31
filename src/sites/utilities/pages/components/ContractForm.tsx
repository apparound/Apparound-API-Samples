import React from 'react'
import Form from '@/sites/utilities/components/custom/form/Form'

const ContractForm = ({ contractDataSchema, onChange, contractData }) => (
   <Form children={contractDataSchema} onChange={onChange} values={contractData.properties} />
)

export default ContractForm
