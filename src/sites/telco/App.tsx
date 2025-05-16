import { useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
import { persistor } from './persistor'
import Index from './pages/Index'
import Privato from '@/sites/telco/pages/Privato'
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
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
               <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <Routes>
                     <Route path="/" element={<Index />} />
                     <Route path="privato" element={<Privato products={undefined} />} />
                     <Route path="business" element={<Business />} />
                     <Route path="offerta-home" element={<OffertaHome />} />
                     <Route path="configure-offer" element={<ConfigureOffer />} />
                     <Route path="*" element={<NotFound />} />
                  </Routes>
               </TooltipProvider>
            </QueryClientProvider>
         </PersistGate>
      </Provider>
   )
}

export default App
