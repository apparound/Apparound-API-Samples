import { useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
import { persistor } from './persistor'
import Index from './pages/Index'
import ConfigureOffer from '@/sites/telco/pages/ConfigureOffer'
import OffertaHome from './pages/OffertaHome'
import OfferDetail from './pages/OfferDetail'
import NotFound from './pages/NotFound'
import './App.css'
import Contract from './pages/Contract'

const queryClient = new QueryClient()

const App = () => {
   const location = useLocation()

   useEffect(() => {
      const root = document.documentElement
      root.classList.add('telco-html')

      return () => {
         root.classList.remove('telco-html')
      }
   }, [location.pathname])

   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
               <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <Routes>
                     <Route path="/" element={<Index />} />
                     <Route path="configure-offer" element={<ConfigureOffer />} />
                     <Route path="offerta-home" element={<OffertaHome />} />
                     <Route path="offer-detail" element={<OfferDetail />} />
                     <Route path="*" element={<NotFound />} />
                     <Route path="contract" element={<Contract />} />
                  </Routes>
               </TooltipProvider>
            </QueryClientProvider>
         </PersistGate>
      </Provider>
   )
}

export default App
