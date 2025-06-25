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

const DocumentData: React.FC<{ readonly?: boolean } & React.RefAttributes<any>> = forwardRef(
   ({ readonly = false }, ref) => {
      const { t } = useTranslation()

      const [documentType, setDocumentType] = React.useState<string | undefined>(undefined)
      const [releaseDate, setReleaseDate] = React.useState<string>('')
      const [expiryDate, setExpiryDate] = React.useState<string>('')
      const [documentNumber, setDocumentNumber] = React.useState<string>('')
      const [frontImage, setFrontImage] = React.useState<string | undefined>(undefined)
      const [backImage, setBackImage] = React.useState<string | undefined>(undefined)

      const formRef = useRef<HTMLDivElement>(null)

      const formatDateLocale = (date: Date) => {
         return date.toLocaleDateString('it-IT').split('/').reverse().join('-')
      }

      const getMinExpiryDate = () => {
         if (!releaseDate) return ''
         const date = new Date(releaseDate)
         date.setDate(date.getDate() + 1)
         return date.toISOString().split('T')[0]
      }

      const handleReleaseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const newReleaseDate = e.target.value
         setReleaseDate(newReleaseDate)
         if (!expiryDate && newReleaseDate) {
            const date = new Date(newReleaseDate)
            date.setFullYear(date.getFullYear() + 10)
            setExpiryDate(formatDateLocale(date))
         }
      }

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
            <Card className="bg-white p-4 shadow-none border-0" ref={formRef}>
               <div className="flex flex-col gap-4 mb-4">
                  <div className="flex flex-row gap-4">
                     <DocumentTypeSelect value={documentType} onChange={setDocumentType} />
                     <DocumentInput
                        id="numero-doc"
                        placeholder="Numero documento"
                        value={documentNumber}
                        onChange={e => setDocumentNumber(e.target.value)}
                        readonly={readonly}
                     />
                  </div>
                  <div className="flex flex-row gap-4">
                     <div className="flex flex-col w-full">
                        <DocumentInput
                           id="data-rilascio"
                           type="date"
                           placeholder="Data rilascio"
                           value={releaseDate}
                           onChange={handleReleaseDateChange}
                           readonly={readonly}
                        />
                     </div>
                     <div className="flex flex-col w-full">
                        <DocumentInput
                           id="data-scadenza"
                           type="date"
                           placeholder="Data scadenza"
                           value={expiryDate}
                           onChange={e => setExpiryDate(e.target.value)}
                           min={getMinExpiryDate()}
                           readonly={readonly}
                        />
                     </div>
                  </div>
               </div>
               <div className="rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
                  <DocumentUploadRow
                     label={t('Fronte documento')}
                     alt="Fronte documento"
                     title={t('Carica fronte documento')}
                     onButtonClick={() => setFrontImage(cartaFront)}
                     imageSrc={frontImage}
                     readOnly={readonly}
                  />
                  <div className="border-t border-gray-200 my-2" />
                  <DocumentUploadRow
                     label={t('Retro documento')}
                     alt="Retro documento"
                     title={t('Carica retro documento')}
                     onButtonClick={() => setBackImage(cartaBack)}
                     imageSrc={backImage}
                     readOnly={readonly}
                  />
               </div>
            </Card>
         </>
      )
   }
)

export default DocumentData
