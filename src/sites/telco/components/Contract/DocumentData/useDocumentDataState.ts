import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   selectDocumentData,
   updateDocumentData,
   loadDocumentData,
   saveDocumentData,
} from '@/sites/retail/features/quoteSlice'

export interface DocumentDataState {
   documentType: string | undefined
   releaseDate: string
   expiryDate: string
   documentNumber: string
   frontImage: string | undefined
   backImage: string | undefined
}

export interface DocumentDataActions {
   setDocumentType: (value: string | undefined) => void
   setReleaseDate: (value: string) => void
   setExpiryDate: (value: string) => void
   setDocumentNumber: (value: string) => void
   setFrontImage: (value: string | undefined) => void
   setBackImage: (value: string | undefined) => void
}

export const useDocumentDataState = () => {
   const dispatch = useDispatch()
   const documentData = useSelector(selectDocumentData)

   // Funzione per normalizzare le date al formato ISO
   const normalizeDateToISO = (dateString: string): string => {
      if (!dateString) return ''

      // Se è già nel formato ISO corretto
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
         const testDate = new Date(dateString)
         return !isNaN(testDate.getTime()) ? dateString : ''
      }

      // Se è nel formato italiano dd/mm/yyyy o dd-mm-yyyy
      if (/^\d{2}[/-]\d{2}[/-]\d{4}$/.test(dateString)) {
         const parts = dateString.split(/[/-]/)
         const isoDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
         const testDate = new Date(isoDate)
         return !isNaN(testDate.getTime()) ? isoDate : ''
      }

      return ''
   }

   // Stati locali con normalizzazione delle date
   const [documentType, setDocumentType] = useState<string | undefined>(documentData?.documentType)
   const [releaseDate, setReleaseDate] = useState<string>(normalizeDateToISO(documentData?.releaseDate || ''))
   const [expiryDate, setExpiryDate] = useState<string>(normalizeDateToISO(documentData?.expiryDate || ''))
   const [documentNumber, setDocumentNumber] = useState<string>(documentData?.documentNumber || '')
   const [frontImage, setFrontImage] = useState<string | undefined>(documentData?.frontImage)
   const [backImage, setBackImage] = useState<string | undefined>(documentData?.backImage)

   // Carica i dati salvati al mount
   useEffect(() => {
      dispatch(loadDocumentData())
   }, [dispatch])

   // Aggiorna gli stati locali quando i dati nel store cambiano
   useEffect(() => {
      if (documentData) {
         setDocumentType(documentData.documentType)
         setReleaseDate(normalizeDateToISO(documentData.releaseDate || ''))
         setExpiryDate(normalizeDateToISO(documentData.expiryDate || ''))
         setDocumentNumber(documentData.documentNumber || '')
         setFrontImage(documentData.frontImage)
         setBackImage(documentData.backImage)
      }
   }, [documentData])

   // Salva i dati nel store ogni volta che cambiano
   useEffect(() => {
      const currentData = {
         documentType,
         releaseDate,
         expiryDate,
         documentNumber,
         frontImage,
         backImage,
      }
      dispatch(updateDocumentData(currentData))
      dispatch(saveDocumentData())
   }, [dispatch, documentType, releaseDate, expiryDate, documentNumber, frontImage, backImage])

   // Funzioni di utilità per la gestione delle date
   const formatDateToISO = (date: Date) => {
      if (isNaN(date.getTime())) return ''
      return date.toISOString().split('T')[0]
   }

   const getMinExpiryDate = () => {
      if (!releaseDate) return ''

      // Verifica che releaseDate sia una data valida
      const releaseDateTime = new Date(releaseDate)
      if (isNaN(releaseDateTime.getTime())) return ''

      const minDate = new Date(releaseDateTime)
      minDate.setDate(minDate.getDate() + 1)

      // Verifica che la data calcolata sia valida
      if (isNaN(minDate.getTime())) return ''

      return formatDateToISO(minDate)
   }

   const handleReleaseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newReleaseDate = e.target.value
      setReleaseDate(newReleaseDate)

      // Auto-imposta la data di scadenza solo se non è già impostata e la data di rilascio è valida
      if (!expiryDate && newReleaseDate) {
         const releaseDateTime = new Date(newReleaseDate)
         if (!isNaN(releaseDateTime.getTime())) {
            const expiryDateTime = new Date(releaseDateTime)
            expiryDateTime.setFullYear(expiryDateTime.getFullYear() + 10)

            if (!isNaN(expiryDateTime.getTime())) {
               setExpiryDate(formatDateToISO(expiryDateTime))
            }
         }
      }
   }

   const state: DocumentDataState = {
      documentType,
      releaseDate,
      expiryDate,
      documentNumber,
      frontImage,
      backImage,
   }

   const actions: DocumentDataActions = {
      setDocumentType,
      setReleaseDate: (value: string) => setReleaseDate(normalizeDateToISO(value)),
      setExpiryDate: (value: string) => setExpiryDate(normalizeDateToISO(value)),
      setDocumentNumber,
      setFrontImage,
      setBackImage,
   }

   return {
      state,
      actions,
      utilities: {
         getMinExpiryDate,
         handleReleaseDateChange,
         formatDateToISO,
      },
   }
}
