import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Privati from './pages/Privati'
import Business from './pages/Business'
import OffertaHome from './pages/OffertaHome'
import NotFound from './pages/NotFound'
import ConfigureOffer from './pages/ConfigureOffer'

const queryClient = new QueryClient()

const App = () => (
   <QueryClientProvider client={queryClient}>
      <TooltipProvider>
         <Toaster />
         <Sonner />
         <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privati" element={<Privati />} />
            <Route path="/business" element={<Business />} />
            <Route path="/offerta-home" element={<OffertaHome />} />
            <Route path="/configure-offer" element={<ConfigureOffer />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </TooltipProvider>
   </QueryClientProvider>
)

export default App
