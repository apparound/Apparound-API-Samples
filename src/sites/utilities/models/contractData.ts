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
      label: 'Dati intestatario fornitura',
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
         },
         {
            size: 6,
            required: true,
            type: 'Text',
            name: 'lastName',
            label: 'Cognome',
         },
         {
            size: 6,
            required: true,
            type: 'Text',
            name: 'customEmailMandatory',
            inputType: 'email',
            label: 'Email',
         },
         {
            size: 6,
            required: true,
            type: 'Text',
            name: 'customPhoneMandatory',
            label: 'Telefono',
         },
         {
            size: 12,
            type: 'Title',
            label: 'Indirizzo',
            className: 'text-left',
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'addressContract_province',
            label: 'Provincia',
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'addressContract_city',
            label: 'Comune',
         },
         {
            size: 4,
            required: true,
            type: 'Text',
            name: 'addressContract_zipCode',
            label: 'CAP',
         },
         {
            size: 12,
            required: true,
            type: 'Text',
            name: 'addressContract_address',
            label: 'Indirizzo e numero civico',
         },
      ],
   },
   {
      size: 12,
      type: 'Title',
      label: 'Seleziona il metodo di invio bolletta',
   },
   billSendingMethod,
   {
      size: 12,
      type: 'Title',
      label: 'Seleziona il metodo di pagamento',
   },
   paymentType,
   {
      size: 12,
      type: 'Title',
      label: 'Informazioni fornitura',
   },
]
