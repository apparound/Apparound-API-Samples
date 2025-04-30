import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ConfigurationStepper from '@/sites/telco/components/ConfigurationStepper'
import { Check, Download, Upload, Router } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const ConfigureOffer = () => {
   const location = useLocation()
   const offer = location.state?.offer || 'Home Full'

   return (
      <div className="min-h-screen bg-gray-50">
         <ConfigurationStepper />

         {/* Hero Section */}
         <div className="relative h-[300px] bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
               <h1 className="text-4xl font-bold mb-4">{offer}</h1>
               <p className="text-xl max-w-2xl">
                  Connessione ultra veloce e stabile per tutta la famiglia. Ideale per streaming, smart working e
                  dispositivi connessi.
               </p>
            </div>
         </div>

         {/* Offer Details */}
         <div className="max-w-3xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-purple-600 mb-8">Dettaglio offerta</h2>

            <Card className="mb-8 p-6">
               <h3 className="font-semibold mb-4">Costi di attivazione</h3>
               <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-2">
                     <div className="text-purple-600">
                        <Router className="w-5 h-5" />
                     </div>
                     <span>Attivazione offerta</span>
                  </div>
                  <span>30,00 €</span>
               </div>

               <h3 className="font-semibold mt-6 mb-4">Costi ricorrenti</h3>
               <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-2">
                     <div className="text-purple-600">
                        <Router className="w-5 h-5" />
                     </div>
                     <span>{offer}</span>
                  </div>
                  <span>25,99 €/mese</span>
               </div>

               <h3 className="font-semibold mt-6 mb-4">Servizi inclusi</h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <Check className="text-green-500" />
                     <span>Chiamate illimitate</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Check className="text-green-500" />
                     <span>Modem incluso</span>
                  </div>
               </div>
            </Card>

            <Card className="mb-8 p-6">
               <h3 className="font-semibold mb-4">Tecnologia FTTC</h3>
               <p className="text-sm text-gray-600 italic mb-4">Fiber to the Cabinet</p>
               <div className="flex gap-8 mb-4">
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <Download className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">Download</span>
                     </div>
                     <p className="text-sm text-gray-600">fino a 200 Mbps</p>
                  </div>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <Upload className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">Upload</span>
                     </div>
                     <p className="text-sm text-gray-600">fino a 20 Mbps</p>
                  </div>
               </div>
               <p className="text-sm text-gray-600">
                  Fibra fino all'armadio stradale e rame fino a casa. Buon compromesso tra velocità e copertura.
               </p>
            </Card>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
               <div className="max-w-3xl mx-auto flex justify-between items-center">
                  <div>
                     <div className="text-sm text-gray-600">Attivazione</div>
                     <div className="text-2xl font-bold">30,00 €</div>
                  </div>
                  <div>
                     <div className="text-sm text-gray-600">Al mese</div>
                     <div className="text-2xl font-bold">38,99 €</div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">ATTIVA ORA</Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ConfigureOffer
