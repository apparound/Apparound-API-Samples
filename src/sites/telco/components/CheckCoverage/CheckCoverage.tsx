import { useState, useEffect } from 'react'
import comuni from '@/assets/comuni.json'
import CheckCoverageForm from './CheckCoverageForm'
import FiberTechnology from './FiberTechnology'
import { useTranslation } from 'react-i18next'
import { updateContractProperties } from '@/sites/retail/features/quoteSlice'
import { useDispatch } from 'react-redux'
import { getProvince, getComuniByProvincia } from '@/utils/comuniUtils'

interface CheckCoverageProps {
   onCoverageResponse?: (response: any) => void
   showError?: boolean
}

const CheckCoverage = ({ onCoverageResponse, showError = false }: CheckCoverageProps) => {
   const { t } = useTranslation()
   const [formData, setFormData] = useState({ provincia: '', comune: '', cap: '', indirizzo: '' })
   const [response, setResponse] = useState(null)
   const dispatch = useDispatch()

   const province = getProvince()
   const comuniByProvincia = getComuniByProvincia(formData.provincia)

   const handleInputChange = e => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }

   const handleProvinceChange = value => {
      if (value.length >= 3) {
         setFormData({ ...formData, provincia: value, comune: '', cap: '' })
      } else {
         setFormData({ ...formData, provincia: '', comune: '', cap: '' })
      }
   }

   const handleComuneChange = value => {
      const selectedComune = comuniByProvincia.find(comune => comune.nome === value)
      setFormData({ ...formData, comune: value, cap: selectedComune?.cap[0] || '' })
   }

   const handleCapChange = value => {
      setFormData({ ...formData, cap: value })
   }

   const handleSubmit = e => {
      e.preventDefault()
      const selectedComune = comuni.find(
         comune =>
            comune.provincia.nome === formData.provincia &&
            comune.nome === formData.comune &&
            comune.cap.includes(formData.cap)
      )

      let res
      if (selectedComune) {
         res = { message: 'Copertura disponibile per il tuo indirizzo!' }
      } else {
         res = { message: 'Nessuna copertura disponibile per il tuo indirizzo.' }
      }
      setResponse(res)
      if (onCoverageResponse) onCoverageResponse(res)

      dispatch(
         updateContractProperties({
            addressContract_province: formData.provincia,
            addressContract_city: formData.comune,
            addressContract_zipCode: formData.cap,
            addressContract_address: formData.indirizzo,
         })
      )
   }

   useEffect(() => {
      const selectedComune = comuniByProvincia.find(comune => comune.nome === formData.comune)
      if (selectedComune?.cap.length === 1) {
         setFormData(prev => ({ ...prev, cap: selectedComune.cap[0] }))
      }
   }, [formData.comune, comuniByProvincia])

   return (
      <>
         <div className="bg-white rounded-3xl w-full shadow p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">{t('Verifica copertura')}</h3>
            <p className="text-gray-600 mb-6">
               {t(
                  'Inserisci il tuo indirizzo, poi verifica la copertura per visualizzare la migliore tecnologia disponibile per te'
               )}
            </p>
            <CheckCoverageForm
               province={province}
               comuniByProvincia={comuniByProvincia}
               formData={formData}
               handleProvinceChange={handleProvinceChange}
               handleComuneChange={handleComuneChange}
               handleCapChange={handleCapChange}
               handleInputChange={handleInputChange}
               handleSubmit={handleSubmit}
            />
            {response && <FiberTechnology />}
            {showError && !response && (
               <div className="text-red-600 text-sm mt-4 text-center">
                  {t('Compila il form di verifica copertura per proseguire')}
               </div>
            )}
         </div>
      </>
   )
}

export default CheckCoverage
