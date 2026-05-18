import React, { useState } from 'react'
import { mdiFileUpload } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'react-i18next'

interface DocumentUploadRowProps {
   label: string
   alt: string
   title: string
   onButtonClick?: () => void
   imageSrc?: string
   readOnly?: boolean
}

const DocumentUploadRow: React.FC<DocumentUploadRowProps> = ({
   label,
   alt,
   title,
   onButtonClick,
   imageSrc,
   readOnly = false,
}) => {
   const { t } = useTranslation()
   const [isModalOpen, setIsModalOpen] = useState(false)
   const handleImageClick = () => setIsModalOpen(true)
   const handleCloseModal = () => setIsModalOpen(false)

   return (
      <>
         <div className="flex items-center gap-4">
            <div
               className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
               onClick={handleImageClick}
            >
               <img
                  src={imageSrc || '/placeholder.svg'}
                  alt={alt}
                  className="object-contain max-w-full max-h-full opacity-60"
               />
            </div>
            <div className="flex-1 font-semibold flex flex-col gap-1 text-left">{label}</div>
            {!readOnly && (
               <button className="text-primary hover:text-purple-700 p-2" title={title} onClick={onButtonClick}>
                  <Icon path={mdiFileUpload} size={1.2} />
               </button>
            )}
         </div>
         {isModalOpen && (
            <div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
               onClick={handleCloseModal}
            >
               <div
                  className="bg-white rounded-lg shadow-lg p-4 max-w-full max-h-full flex flex-col items-center"
                  onClick={e => e.stopPropagation()}
               >
                  <img
                     src={imageSrc || '/placeholder.svg'}
                     alt={alt}
                     className="object-contain max-h-[80vh] max-w-[90vw]"
                  />
                  <button
                     className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-700"
                     onClick={handleCloseModal}
                  >
                     {t('Chiudi').toUpperCase()}
                  </button>
               </div>
            </div>
         )}
      </>
   )
}

export default DocumentUploadRow
