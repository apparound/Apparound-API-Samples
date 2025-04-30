import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const OffertaHome = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-screen bg-white">
         {/* Navbar */}
         <nav className="flex justify-between items-center p-4 border-b">
            <div className="text-xl font-semibold text-purple-600 cursor-pointer" onClick={() => navigate('/')}>
               TelcoSample
            </div>
            <div className="space-x-4">
               <Button variant="link" className="text-purple-600" onClick={() => navigate('/privati')}>
                  PRIVATI
               </Button>
               <Button variant="link" className="text-purple-600" onClick={() => navigate('/business')}>
                  BUSINESS
               </Button>
            </div>
         </nav>

         {/* Header */}
         <header className="relative h-[300px] bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-center px-4">
            <div>
               <h1 className="text-4xl font-bold text-white mb-4">Offerte Home</h1>
               <p className="text-xl text-white/90 max-w-2xl">
                  Connessione ultra veloce e stabile per tutta la famiglia. Ideale per streaming, smart working e
                  dispositivi connessi.
               </p>
            </div>
         </header>

         {/* Main Content */}
         <main className="max-w-6xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-purple-600 mb-12 text-center">Ecco le offerte pensate per te</h2>

            {/* Offer Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
               {/* Home Light */}
               <Card className="relative overflow-hidden">
                  <div className="p-6">
                     <h3 className="text-xl font-bold text-purple-600 mb-6">Home Light</h3>
                     <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Velocità fino a 2 Gbps</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Fibra ultraveloce</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Modem incluso</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Chiamate a consumo</span>
                        </li>
                     </ul>
                     <div className="text-center mb-6">
                        <div className="text-sm text-gray-600">A partire da</div>
                        <div className="text-3xl font-bold text-purple-600">
                           22,99 € <span className="text-sm font-normal">al mese</span>
                        </div>
                     </div>
                     <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => navigate('/configure-offer', { state: { offer: 'Home Light' } })}
                     >
                        SCOPRI E ATTIVA
                     </Button>
                  </div>
               </Card>

               {/* Home Full */}
               <Card className="relative overflow-hidden border-purple-600 shadow-lg">
                  <div className="p-6">
                     <h3 className="text-xl font-bold text-purple-600 mb-6">Home Full</h3>
                     <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Velocità fino a 2 Gbps</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Fibra ultraveloce</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Modem incluso</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Chiamate illimitate</span>
                        </li>
                     </ul>
                     <div className="text-center mb-6">
                        <div className="text-sm text-gray-600">A partire da</div>
                        <div className="text-3xl font-bold text-purple-600">
                           25,99 € <span className="text-sm font-normal">al mese</span>
                        </div>
                     </div>
                     <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => navigate('/configure-offer', { state: { offer: 'Home Full' } })}
                     >
                        SCOPRI E ATTIVA
                     </Button>
                  </div>
               </Card>

               {/* Home Internet Full */}
               <Card className="relative overflow-hidden">
                  <div className="p-6">
                     <h3 className="text-xl font-bold text-purple-600 mb-6">Home Internet Full</h3>
                     <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Velocità fino a 2 Gbps</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Fibra ultraveloce</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Modem incluso</span>
                        </li>
                        <li className="flex items-center">
                           <Check className="text-green-500 mr-2" />
                           <span>Solo Internet</span>
                        </li>
                     </ul>
                     <div className="text-center mb-6">
                        <div className="text-sm text-gray-600">A partire da</div>
                        <div className="text-3xl font-bold text-purple-600">
                           20,99 € <span className="text-sm font-normal">al mese</span>
                        </div>
                     </div>
                     <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => navigate('/configure-offer', { state: { offer: 'Home Internet Full' } })}
                     >
                        SCOPRI E ATTIVA
                     </Button>
                  </div>
               </Card>
            </div>

            {/* App Download Section */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
               <h3 className="text-2xl font-bold text-purple-600 mb-4">Scarica l'app per gestire la tua offerta</h3>
               <p className="text-gray-600 mb-6">
                  Gestisci la tua offerta, monitora i consumi e ricevi assistenza direttamente dal tuo smartphone
               </p>
               <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="App"
                  className="max-w-md mx-auto rounded-lg shadow-lg"
               />
            </div>
         </main>

         {/* Footer */}
         <footer className="py-4 px-4 border-t text-center text-sm text-gray-600">
            <p>©Copyright TelcoSample. All rights reserved.</p>
         </footer>
      </div>
   )
}

export default OffertaHome
