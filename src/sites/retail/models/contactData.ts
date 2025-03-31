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
        size: 12,
        required: true,
        type: 'Text',
        name: 'email',
        inputType: 'email',
        label:'Email'
    }
]
