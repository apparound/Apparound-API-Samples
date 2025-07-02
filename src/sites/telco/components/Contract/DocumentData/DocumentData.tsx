import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Card } from '@/components/ui/card'
import SectionTitle from '../../SectionTitle'
import { useTranslation } from 'react-i18next'
import DocumentInput from './DocumentInput'
import DocumentUploadRow from './DocumentUploadRow'
import DocumentTypeSelect from './DocumentTypeSelect'
import cartaBack from '@/sites/telco/assets/misc/CartaBack.jpeg'
import cartaFront from '@/sites/telco/assets/misc/CartaFront.jpeg'
import { setRedOutline } from '@/lib/setRedOutline'
import { useDocumentDataState } from './useDocumentDataState'

const DocumentData: React.FC<{ readonly?: boolean } & React.RefAttributes<any>> = forwardRef(
   ({ readonly = false }, ref) => {
      const { t } = useTranslation()
      const { state, actions, utilities } = useDocumentDataState()

      const formRef = useRef<HTMLDivElement>(null)

      const documentInputs = [
         {
            id: 'numero-doc',
            placeholder: 'Numero documento',
            value: state.documentNumber,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => actions.setDocumentNumber(e.target.value),
            type: 'text' as const,
         },
         {
            id: 'data-rilascio',
            placeholder: 'Data rilascio',
            value: state.releaseDate,
            onChange: utilities.handleReleaseDateChange,
            type: 'date' as const,
         },
         {
            id: 'data-scadenza',
            placeholder: 'Data scadenza',
            value: state.expiryDate,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => actions.setExpiryDate(e.target.value),
            type: 'date' as const,
            min: utilities.getMinExpiryDate(),
         },
      ]

      const validate = () => {
         let valid = true
         if (formRef.current) {
            const inputs = formRef.current.querySelectorAll('input, select')
            inputs.forEach((el: any) => {
               if (!el.value) {
                  setRedOutline(el, true)
                  valid = false
               } else {
                  setRedOutline(el, false)
               }
            })
         }
         return valid
      }
      useImperativeHandle(ref, () => ({ validate }))

      return (
         <>
            <SectionTitle text="Documento" />
            <Card className="bg-white p-2 sm:p-4 shadow-none border-0" ref={formRef}>
               <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                     <div className="w-full sm:w-1/2">
                        <DocumentTypeSelect
                           value={state.documentType}
                           onChange={actions.setDocumentType}
                           readOnly={readonly}
                        />
                     </div>
                     <div className="w-full sm:w-1/2">
                        <DocumentInput
                           id={documentInputs[0].id}
                           placeholder={documentInputs[0].placeholder}
                           value={documentInputs[0].value}
                           onChange={documentInputs[0].onChange}
                           readonly={readonly}
                        />
                     </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                     {documentInputs.slice(1).map(input => (
                        <div key={input.id} className="flex flex-col w-full">
                           <DocumentInput
                              id={input.id}
                              type={input.type}
                              placeholder={input.placeholder}
                              value={input.value}
                              onChange={input.onChange}
                              min={input.min}
                              readonly={readonly}
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <div className="rounded-xl border border-gray-200 p-2 sm:p-4 flex flex-col gap-3 sm:gap-4">
                  <DocumentUploadRow
                     label={t('Fronte documento')}
                     alt="Fronte documento"
                     title={t('Carica fronte documento')}
                     onButtonClick={() => actions.setFrontImage(cartaFront)}
                     imageSrc={state.frontImage}
                     readOnly={readonly}
                  />
                  <div className="border-t border-gray-200 my-1 sm:my-2" />
                  <DocumentUploadRow
                     label={t('Retro documento')}
                     alt="Retro documento"
                     title={t('Carica retro documento')}
                     onButtonClick={() => actions.setBackImage(cartaBack)}
                     imageSrc={state.backImage}
                     readOnly={readonly}
                  />
               </div>
            </Card>
         </>
      )
   }
)

export default DocumentData
