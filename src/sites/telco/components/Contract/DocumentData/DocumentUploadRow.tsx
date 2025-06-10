import React from 'react'
import { mdiFileUpload } from '@mdi/js'
import Icon from '@mdi/react'

interface DocumentUploadRowProps {
   label: string
   alt: string
   title: string
}

const DocumentUploadRow: React.FC<DocumentUploadRowProps> = ({ label, alt, title }) => (
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

export default DocumentUploadRow
