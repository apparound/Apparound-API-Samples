import React from 'react'
import Form from '@/sites/utilities/components/custom/form/Form'

const PwForm = ({ pwDataSchema, onChangePw, pwData }) => (
   <Form children={pwDataSchema} onChange={onChangePw} values={pwData} />
)

export default PwForm
