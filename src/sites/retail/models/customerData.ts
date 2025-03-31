export default [
    {
        size: 12,
        type: 'Title',
        label: 'Inserisci i tuoi dati, riceverai l\'offerta via email.<br />Continua con la compilazione dei dati del contratto.',
        className: 'text-left font-normal'
    },
    {
        size: 6,
        required: true,
        type: 'Text',
        name: 'firstName',
        label:'Nome'
    },
    {
        size: 6,
        required: true,
        type: 'Text',
        name: 'lastName',
        label:'Cognome'
    },
    {
        size: 6,
        required: true,
        type: 'Text',
        name: 'email',
        inputType: 'email',
        label:'Email'
    },
    {
        size: 6,
        required: true,
        type: 'Text',
        name: 'customPhoneMandatory',
        label:'Telefono'
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
        name: 'customAddress_province',
        label:'Provincia'
    },
    {
        size: 4,
        required: true,
        type: 'Text',
        name: 'customAddress_city',
        label:'Comune'
    },
    {
        size: 4,
        required: true,
        type: 'Text',
        name: 'customAddress_zipCode',
        label:'CAP'
    },
    {
        size: 12,
        required: true,
        type: 'Text',
        name: 'customAddress_address',
        label:'Indirizzo e numero civico'
    }
]
