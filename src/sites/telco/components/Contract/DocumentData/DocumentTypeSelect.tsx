import React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

interface DocumentTypeSelectProps {
   value?: string
   onChange: (value: string) => void
}

const documentTypes = [
   { value: 'carta-id', label: "Carta d'identità" },
   { value: 'patente', label: 'Patente' },
   { value: 'passaporto', label: 'Passaporto' },
]

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ value, onChange }) => {
   const { t } = useTranslation()
   return (
      <Select name="tipo-doc" onValueChange={onChange} value={value}>
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
   )
}

export default DocumentTypeSelect
