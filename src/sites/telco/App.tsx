import { useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Privati from '@/sites/telco/pages/Privati'
import Business from '@/sites/telco/pages/Business'
import OffertaHome from './pages/OffertaHome'
import NotFound from './pages/NotFound'
import ConfigureOffer from './pages/ConfigureOffer'
import './App.css'

const queryClient = new QueryClient()

const App = () => {
   useEffect(() => {
      const root = document.documentElement
      root.classList.add('telco-html')

      return () => {
         root.classList.remove('telco-html')
      }
   }, [])

   return (
      <QueryClientProvider client={queryClient}>
         <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
               <Route path="/" element={<Index />} />
               <Route path="privati" element={<Privati />} />
               <Route path="business" element={<Business />} />
               <Route path="offerta-home" element={<OffertaHome />} />
               <Route path="configure-offer" element={<ConfigureOffer />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </TooltipProvider>
      </QueryClientProvider>
   )
}

export default App
