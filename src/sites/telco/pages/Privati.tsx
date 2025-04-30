import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'

const Privati = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-screen bg-white">
         {/* Navbar */}
         <nav className="flex justify-between items-center p-4 border-b">
            <div className="text-xl font-semibold text-purple-600 cursor-pointer" onClick={() => navigate('/')}>
               TelcoSample
            </div>
            <div className="space-x-4">
               <Button variant="link" className="text-purple-600">
                  PRIVATI
               </Button>
               <Button variant="link" className="text-purple-600" onClick={() => navigate('/business')}>
                  BUSINESS
               </Button>
            </div>
         </nav>

         {/* Header */}
         <header className="relative h-[300px] bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Offerte Privati</h1>
         </header>

         {/* Main Content */}
         <main className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-purple-600 mb-8 text-center">Configura la tua offerta</h2>

            {/* Offer Types */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
               <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <img
                     src="/lovable-uploads/09f23e1b-df7e-46f5-b592-389496fa825e.png"
                     alt="Mobile"
                     className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                     <h3 className="text-xl font-bold text-purple-600">Mobile</h3>
                  </div>
               </Card>

               <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate('/offerta-home')}
               >
                  <img
                     src="/lovable-uploads/0cde01a7-49c7-4632-98f3-eb2c72bd5ae4.png"
                     alt="Home"
                     className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                     <h3 className="text-xl font-bold text-purple-600">Home</h3>
                  </div>
               </Card>
            </div>

            {/* Mobile Options */}
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

            {/* Coverage Check */}
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
