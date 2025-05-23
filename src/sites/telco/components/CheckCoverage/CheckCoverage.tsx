import { useState, useEffect } from 'react'
import comuni from '@/assets/comuni.json'
import CheckCoverageForm from './CheckCoverageForm'
import FiberTechnology from './FiberTechnology'

const CheckCoverage = () => {
   const [formData, setFormData] = useState({ provincia: '', comune: '', cap: '', indirizzo: '' })
   const [response, setResponse] = useState(null)

   const province = [...new Set(comuni.map((comune: { provincia: { nome: string } }) => comune.provincia.nome))].sort()
   const comuniByProvincia = formData.provincia
      ? comuni
           .filter(
              (comune: { provincia: { nome: string }; nome: string }) => comune.provincia.nome === formData.provincia
           )
           .sort((a, b) => a.nome.localeCompare(b.nome))
      : []

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

      if (selectedComune) {
         setResponse({ message: 'Copertura disponibile per il tuo indirizzo!' })
      } else {
         setResponse({ message: 'Nessuna copertura disponibile per il tuo indirizzo.' })
      }
   }

   useEffect(() => {
      const selectedComune = comuniByProvincia.find(comune => comune.nome === formData.comune)
      if (selectedComune?.cap.length === 1) {
         setFormData(prev => ({ ...prev, cap: selectedComune.cap[0] }))
      }
   }, [formData.comune, comuniByProvincia])

   return (
      <div className="bg-white rounded-lg shadow p-6">
         <h3 className="text-xl font-semibold text-primary mb-4">Verifica copertura</h3>
         <p className="text-gray-600 mb-6">
            Inserisci il tuo indirizzo, poi verifica la copertura per visualizzare la migliore tecnologia disponibile
            per te
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
      </div>
   )
}

export default CheckCoverage
