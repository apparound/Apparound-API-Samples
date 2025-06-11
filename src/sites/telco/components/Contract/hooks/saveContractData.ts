import { updateContractProperties } from '@/sites/retail/features/quoteSlice'
import { saveContract } from '../../../hooks/apparoundData'

export const saveContractData = async (contractData: any, customerData: any, dispatch: any) => {
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
   const propertiesToUpdate = Object.entries(mapping).reduce((acc: any, [contractKey, customerKey]) => {
      if (customerData && customerData[customerKey] !== undefined) {
         acc[contractKey] = customerData[customerKey]
      }
      return acc
   }, {})
   if (Object.keys(propertiesToUpdate).length > 0) {
      dispatch(updateContractProperties(propertiesToUpdate))
   }
   await saveContract(contractData, customerData, dispatch)
}
