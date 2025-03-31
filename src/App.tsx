import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/sites/utilities/components/ui/tooltip'
import Retail from '@/sites/retail/App'
import Utilities from '@/sites/utilities/App'
import Landing from '@/components/Landing/Landing'

const queryClient = new QueryClient()

function App() {
   return (
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <TooltipProvider>
               <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/utilities/*" element={<Utilities />} />
                  <Route path="/retail/*" element={<Retail />} />
               </Routes>
            </TooltipProvider>
         </QueryClientProvider>
      </BrowserRouter>
   )
}

export default App
