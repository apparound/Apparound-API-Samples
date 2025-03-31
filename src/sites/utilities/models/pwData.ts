import { mdiLightbulbOnOutline, mdiGasBurner } from '@mdi/js'

export default {
   Luce: [
      {
         size: 12,
         type: 'Card',
         children: [
            {
               size: 12,
               type: 'Form',
               className: 'items-center',
               children: [
                  {
                     size: 3,
                     type: 'Icon',
                     label: 'Luce',
                     icon: mdiLightbulbOnOutline,
                  },
                  {
                     size: 9,
                     type: 'Form',
                     children: [
                        {
                           size: 12,
                           required: true,
                           type: 'Text',
                           name: 'pod',
                           label: 'POD',
                        },
                        {
                           size: 12,
                           required: true,
                           type: 'Text',
                           name: 'letturaPOD',
                           label: 'Lettura contatore (kWh)',
                        },
                     ],
                  },
               ],
            },
         ],
      },
      {
         size: 12,
         type: 'Title',
         className: '!text-sm !font-normal -mt-4 text-[#ccc]',
         label: 'POD: codice a 14 o 15 caratteri che identifica il contatore della luce; si trova in tutte le bollette',
      },
   ],
   Gas: [
      {
         size: 12,
         type: 'Card',
         children: [
            {
               size: 12,
               type: 'Form',
               className: 'items-center',
               children: [
                  {
                     size: 3,
                     type: 'Icon',
                     label: 'Gas',
                     icon: mdiGasBurner,
                  },
                  {
                     size: 9,
                     type: 'Form',
                     children: [
                        {
                           size: 12,
                           required: true,
                           type: 'Text',
                           name: 'pdr',
                           label: 'PDR',
                        },
                        {
                           size: 12,
                           required: true,
                           type: 'Text',
                           name: 'letturaPDR',
                           label: 'Lettura contatore (m³)',
                        },
                     ],
                  },
               ],
            },
         ],
      },
      {
         size: 12,
         type: 'Title',
         className: '!text-sm !font-normal -mt-4 text-[#ccc]',
         label: 'PDR: codice a 14 cifre che identifica il contatore del gas; si trova in tutte le bollette',
      },
   ],
}
