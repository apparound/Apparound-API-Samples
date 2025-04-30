import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useNavigate } from 'react-router-dom'

const Index = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-screen bg-white">
         {/* Navbar */}
         <nav className="flex justify-between items-center p-4 border-b">
            <div className="text-xl font-semibold text-purple-600">TelcoSample</div>
            <div className="space-x-4">
               <Button variant="link" className="text-purple-600" onClick={() => navigate('/privati')}>
                  PRIVATI
               </Button>
               <Button variant="link" className="text-purple-600" onClick={() => navigate('/business')}>
                  BUSINESS
               </Button>
            </div>
         </nav>

         {/* Hero Section with Carousel */}
         <section className="relative h-[500px] bg-gradient-to-r from-purple-600 to-blue-500">
            <Carousel className="h-full">
               <CarouselContent>
                  <CarouselItem className="flex items-center justify-center text-white">
                     <div className="max-w-4xl mx-auto text-center space-y-6 p-8">
                        <h1 className="text-4xl font-bold">WiFi ancora più potente, veloce e sicuro</h1>
                        <p className="text-xl">Scopri le nostre soluzioni per privati e aziende</p>
                     </div>
                  </CarouselItem>
               </CarouselContent>
               <CarouselPrevious className="text-white" />
               <CarouselNext className="text-white" />
            </Carousel>
         </section>

         {/* Offerte Section */}
         <section className="py-16 px-4">
            <h2 className="text-3xl font-bold text-center text-purple-600 mb-12">Scopri le offerte pensate per te</h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
               <Card className="relative overflow-hidden group cursor-pointer" onClick={() => navigate('/privati')}>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent group-hover:opacity-75 transition-opacity" />
                  <img
                     src="/lovable-uploads/d3ee0c4e-1aef-41e5-887e-86b773ec4f7a.png"
                     alt="Privati"
                     className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                     <h3 className="text-2xl font-bold text-purple-600">PRIVATI</h3>
                  </div>
               </Card>

               <Card className="relative overflow-hidden group cursor-pointer" onClick={() => navigate('/business')}>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent group-hover:opacity-75 transition-opacity" />
                  <img
                     src="/lovable-uploads/464f3f49-e813-449c-a08b-a4549fa5750e.png"
                     alt="Business"
                     className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                     <h3 className="text-2xl font-bold text-purple-600">BUSINESS</h3>
                  </div>
               </Card>
            </div>
         </section>

         {/* Footer */}
         <footer className="py-4 px-4 border-t text-center text-sm text-gray-600">
            <p>©Copyright TelcoSample. All rights reserved.</p>
         </footer>
      </div>
   )
}

export default Index
