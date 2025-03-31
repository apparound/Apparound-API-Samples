import React, { forwardRef } from 'react'
import customerDataSchema from '@/sites/utilities/models/customerData'
import Form from '@/sites/utilities/components/custom/form/Form'

const CustomerForm = forwardRef(function ({ customerData, onChange }, ref) {
    return (
        <form className='w-full' ref={ref}>
            <Form children={customerDataSchema} onChange={onChange} values={customerData} />
        </form>
    )
})

export default CustomerForm
