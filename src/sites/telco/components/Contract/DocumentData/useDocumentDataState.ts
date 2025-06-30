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

   // Stati locali
   const [documentType, setDocumentType] = useState<string | undefined>(documentData?.documentType)
   const [releaseDate, setReleaseDate] = useState<string>(documentData?.releaseDate || '')
   const [expiryDate, setExpiryDate] = useState<string>(documentData?.expiryDate || '')
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
         setReleaseDate(documentData.releaseDate || '')
         setExpiryDate(documentData.expiryDate || '')
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
      setReleaseDate,
      setExpiryDate,
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
         formatDateLocale,
      },
   }
}
