import { forwardRef } from 'react'
import customerDataSchema from '@/sites/utilities/models/customerData'
import Form from '@/sites/utilities/components/custom/form/Form'

const CustomerForm = forwardRef(function ({ customerData, onChange, formSubmitted }, ref) {
   return (
      <form className="w-full" ref={ref}>
         <Form children={customerDataSchema} onChange={onChange} values={customerData} formSubmitted={formSubmitted} />
      </form>
   )
})

export default CustomerForm
