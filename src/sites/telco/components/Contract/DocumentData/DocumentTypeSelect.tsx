import React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

interface DocumentTypeSelectProps {
   value?: string
   onChange: (value: string) => void
   readOnly?: boolean
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ value, onChange, readOnly = false }) => {
   const { t } = useTranslation()

   const documentTypes = [
      { value: 'carta-id', label: t("Carta d'identità") },
      { value: 'patente', label: t('Patente') },
      { value: 'passaporto', label: t('Passaporto') },
   ]

   return (
      <Select name="tipo-doc" onValueChange={onChange} value={value} disabled={readOnly}>
         <SelectTrigger className="h-15 bg-white">
            <SelectValue placeholder={t('Tipo documento')} />
         </SelectTrigger>
         <SelectContent>
            {documentTypes.map(doc => (
               <SelectItem
                  key={doc.value}
                  value={doc.value}
                  className="data-[state=checked]:bg-[#f4f4f4] data-[highlighted]:bg-[#f4f4f4]"
               >
                  {doc.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default DocumentTypeSelect
