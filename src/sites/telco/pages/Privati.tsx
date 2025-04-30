import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/sites/telco/components/Navbar'
import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'
import { useMediaQuery } from 'react-responsive'
import OfferCard from '@/sites/telco/components/OfferCard'

const Privati = () => {
   const navigate = useNavigate()
   const isMobile = useMediaQuery({ maxWidth: 767 })

   return (
      <div className="min-h-screen bg-white">
         <Navbar />
         <div className="w-full">
            {!isMobile ? (
               <StepIndicator step={1} customSteps={['Configura', 'Scopri', 'Attiva', 'Inserisci i dati', 'Fine']} />
            ) : (
               <div className="border-t-2 w-full" style={{ borderColor: '#f4f4f4' }}></div>
            )}
         </div>

         <header
            className="relative h-[300px] bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center bg-cover bg-center"
            style={{
               backgroundImage: 'url(/src/sites/telco/assets/images/privati_banner.png)',
            }}
         >
            <h1 className="text-4xl font-bold text-white">Offerte Privati</h1>
         </header>

         <main className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-purple-600 mb-8 text-center">Configura la tua offerta</h2>

            <div className="flex flex-wrap gap-8 mb-12 justify-center">
               <OfferCard imageSrc="/src/sites/telco/assets/images/banner04.png" title="Mobile" />
               <OfferCard
                  imageSrc="/src/sites/telco/assets/images/banner03.png"
                  title="Home"
                  onClick={() => navigate('/offerta-home')}
               />
            </div>

            <div className="space-y-4 mb-12">
               <h3 className="text-xl font-semibold text-purple-600 mb-4">Opzioni offerta Mobile</h3>
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span>Portabilità del numero</span>
                  <Switch />
               </div>
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span>Modem incluso</span>
                  <Switch />
               </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
               <h3 className="text-xl font-semibold text-purple-600 mb-4">Verifica copertura</h3>
               <p className="text-gray-600 mb-6">
                  Inserisci il tuo indirizzo, poi verifica la copertura per visualizzare la migliore tecnologia
                  disponibile per te
               </p>
               <form className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                     <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Provincia" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="pisa">Pisa</SelectItem>
                           <SelectItem value="roma">Roma</SelectItem>
                           <SelectItem value="milano">Milano</SelectItem>
                        </SelectContent>
                     </Select>
                     <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Comune" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="pisa">Pisa</SelectItem>
                           <SelectItem value="cascina">Cascina</SelectItem>
                        </SelectContent>
                     </Select>
                     <Input placeholder="CAP" />
                  </div>
                  <Input placeholder="Indirizzo e numero civico" />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">VERIFICA COPERTURA</Button>
               </form>
            </div>
         </main>

         {/* Footer */}
         <footer className="py-4 px-4 border-t text-center text-sm text-gray-600">
            <p>©Copyright TelcoSample. All rights reserved.</p>
         </footer>
      </div>
   )
}

export default Privati
