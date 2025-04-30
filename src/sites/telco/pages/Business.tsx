import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/sites/telco/components/Navbar'

const Business = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-screen bg-white">
         <Navbar />

         {/* Header */}
         <header className="relative h-[300px] bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Soluzioni Business</h1>
         </header>

         {/* Coming Soon */}
         <main className="max-w-4xl mx-auto py-24 px-4 text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-8">Le nostre soluzioni business saranno presto disponibili.</p>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/')}>
               Torna alla Home
            </Button>
         </main>

         {/* Footer */}
         <footer className="py-4 px-4 border-t text-center text-sm text-gray-600">
            <p>©Copyright TelcoSample. All rights reserved.</p>
         </footer>
      </div>
   )
}

export default Business
