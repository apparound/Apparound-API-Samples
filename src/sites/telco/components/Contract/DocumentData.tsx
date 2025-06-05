import React from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { mdiFileUpload } from '@mdi/js'
import Icon from '@mdi/react'
import SectionTitle from '../SectionTitle'
import { useTranslation } from 'react-i18next'

const DocumentUploadRow: React.FC<{ label: string; alt: string; title: string }> = ({ label, alt, title }) => (
   <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
         <img src="/placeholder.svg" alt={alt} className="w-10 h-10 opacity-60" />
      </div>
      <div className="flex-1 font-semibold flex flex-col gap-1">{label}</div>
      <button className="text-primary hover:text-purple-700 p-2" title={title}>
         <Icon path={mdiFileUpload} size={1.2} />
      </button>
   </div>
)

const DocumentInput: React.FC<{ id: string; type?: string; placeholder?: string }> = ({
   id,
   type = 'text',
   placeholder,
}) => (
   <div>
      <Input id={id} type={type} className="w-full" placeholder={placeholder} />
   </div>
)

const DocumentData: React.FC = () => {
   const documentTypes = [
      { value: 'carta-id', label: "Carta d'identità" },
      { value: 'patente', label: 'Patente' },
      { value: 'passaporto', label: 'Passaporto' },
   ]

   const handleDocumentTypeChange = (value: string) => {
      // gestisci la selezione del tipo di documento
   }

   const { t } = useTranslation()

   return (
      <div>
         <SectionTitle text={t('Documento')} />
         <Card className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <div className="flex flex-col gap-4 mb-4">
               <div className="flex flex-row gap-4">
                  <div className="flex-1 min-w-0">
                     <Select name="tipo-doc" onValueChange={handleDocumentTypeChange}>
                        <SelectTrigger>
                           <SelectValue placeholder={t('Tipo documento')} />
                        </SelectTrigger>
                        <SelectContent>
                           {documentTypes.map(doc => (
                              <SelectItem key={doc.value} value={doc.value}>
                                 {doc.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="flex-1 min-w-0">
                     <DocumentInput id="numero-doc" placeholder="Inserisci il numero" />
                  </div>
               </div>
               <div className="flex flex-row gap-4">
                  <div className="flex-1 min-w-0">
                     <DocumentInput id="data-rilascio" type="date" placeholder="Data rilascio" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <DocumentInput id="data-scadenza" type="date" placeholder="Data scadenza" />
                  </div>
               </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
               <DocumentUploadRow
                  label={t('Fronte documento')}
                  alt="Fronte documento"
                  title="Carica fronte documento"
               />
               <div className="border-t border-gray-200 my-2" />
               <DocumentUploadRow label={t('Retro documento')} alt="Retro documento" title="Carica retro documento" />
            </div>
         </Card>
      </div>
   )
}

export default DocumentData
