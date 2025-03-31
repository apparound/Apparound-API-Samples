import { ApparoundData } from '@/hooks/use-apparound-data'

export const CUSTOMER_DATA = {
   lastName: 'Rossi',
   firstName: 'Mario',
   email: 'mario.rossi@example.com',
   phoneNumber: '+393474455890',
   customerType: 'business',
   companyName: 'MarioRossi S.r.l.',
   vatNumber: '99999999990',
   properties: {
      customEmail: 'mario.rossi@example.com',
      customCheckBox: false,
      customPhoneMandatory: '+393474455890',
      customEmailMandatory: 'mario.rossi@example.com',
      contractPhone: '+393474455890',
      contractEmail: 'mario.rossi@example.com',
      dateTest: '2024-12-06',
      startContract: '2024-12-09',
      customCheckBox_not: true,
   },
}

export const createCustomer = async () => {
   const apparoundData: any = new ApparoundData()
   return await apparoundData.createCustomer({
      customer: CUSTOMER_DATA,
      customerQuoteId: -1,
   })
}

export const createCustomerQuote = async (customerId: number) => {
   const apparoundData: any = new ApparoundData()
   let customer = Object.assign({}, CUSTOMER_DATA, { id: customerId })
   return await apparoundData.createCustomer({
      customer: customer,
      customerQuoteId: -1,
   })
}

export const getCustomer = async () => {
   const apparoundData: any = new ApparoundData()
   return await apparoundData.getCustomer({
      logic: 'and',
      filters: [
         {
            operator: 'eq',
            value: '99999999990',
            field: 'vatNumber',
         },
      ],
   })
}
