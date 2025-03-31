import BollettinoPostale from '@/sites/utilities/assets/images/bollettino-postale.svg'
import Sepa from '@/sites/utilities/assets/images/sepa.svg'
import FatturaCartacea from '@/sites/utilities/assets/images/fattura-cartacea.svg'
import FatturaOnline from '@/sites/utilities/assets/images/fattura-online.svg'

export const billSendingMethod = {
   size: 12,
   required: true,
   type: 'RadioBox',
   name: 'headlessBillSendingMethod',
   children: [
      {
         icon: FatturaOnline,
         value: '1',
         label: 'Fattura online',
         info: 'Ricevi la bolletta online in formato digitale rapido ed ecologico',
      },
      {
         icon: FatturaCartacea,
         value: '2',
         label: 'Fattura cartacea',
         info: 'Bolletta inviata al tuo domicilio tramite posta, ideale per che preferisce un formato fisico',
      },
   ],
}

export const paymentType = {
   size: 12,
   required: true,
   type: 'RadioBox',
   name: 'headlessPaymentType',
   children: [
      {
         icon: BollettinoPostale,
         value: '1',
         label: 'Bollettino postale',
         info: 'Pagamento manuale presso poste, tabaccherie o online',
      },
      {
         icon: Sepa,
         value: '2',
         label: 'SEPA',
         info: 'Addebito automatico sul conto corrente alla scadenza',
      },
   ],
}

export default [
   {
      size: 12,
      type: 'Title',
      label: 'Spedizione',
      className: 'text-left'
   },
   {
      size: 12,
      type: 'Card',
      children: [
         {
            size: 6,
            required: true,
            type: 'Text',
            name: 'firstName',
            label: 'Nome',
            mapToCustomer: 'firstName'
         },
         {
            size: 6,
            required: true,
            type: 'Text',
            name: 'lastName',
            label: 'Cognome',
            mapToCustomer: 'lastName'
         },
         {
            size: 6,
            required: true,
            type: 'Text',
            name: 'customEmailMandatory',
            inputType: 'email',
            label: 'Email',
            mapToCustomer: 'email'
         },
         {
            size: 6,
            required: true,
            type: 'Text',
            name: 'customPhoneMandatory',
            label: 'Telefono',
            mapToCustomer: 'customPhoneMandatory'
         },
         {
            size: 12,
            type: 'Title',
            label: 'Indirizzo',
            className: 'text-left'
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'addressContract_province',
            label: 'Provincia',
            mapToCustomer: 'customAddress_province'
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'addressContract_city',
            label: 'Comune',
            mapToCustomer: 'customAddress_city'
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'addressContract_zipCode',
            label: 'CAP',
            mapToCustomer: 'customAddress_zipCode'
         },
         {
            size: 12,
            required: true,
            type: 'Text',
            name: 'addressContract_address',
            label: 'Indirizzo e numero civico',
            mapToCustomer: 'customAddress_address'
         },
      ],
   },
   {
      size: 12,
      type: 'CheckBox',
      name: 'copyAddress',
      label: 'L\'indirizzo di fatturazione è uguale a quello di spedizione',
      className: 'text-left',
      copy: {
         addressContract_province: 'billingAddress_province',
         addressContract_city: 'billingAddress_city',
         addressContract_zipCode: 'billingAddress_zipCode',
         addressContract_address: 'billingAddress_address'
      }
   },
   {
      size: 12,
      type: 'Card',
      children: [
         {
            size: 12,
            type: 'Title',
            label: 'Indirizzo fatturazione',
            className: 'text-left',
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'billingAddress_province',
            label: 'Provincia',
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'billingAddress_city',
            label: 'Comune',
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'billingAddress_zipCode',
            label: 'CAP',
         },
         {
            size: 12,
            required: true,
            type: 'Text',
            name: 'billingAddress_address',
            label: 'Indirizzo e numero civico',
         },
      ],
   }
]
