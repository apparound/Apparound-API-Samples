import { Routes, Route } from 'react-router-dom';
import { ConsumptionProvider } from '@/sites/utilities/context/ConsumptionContext';
import Index from '@/sites/utilities/pages/Index';
import Summary from '@/sites/utilities/pages/Summary';
import ContractData from '@/sites/utilities/pages/ContractData';
import ContractSignature from '@/sites/utilities/pages/ContractSignature';
import ContractClose from '@/sites/utilities/pages/ContractClose';
import { useEffect, useState } from 'react';
import './App.css'

function App() {
   const [ready, setReady] = useState(false)
   useEffect(() => {
      if (window.location.pathname === '/utilities') {
         localStorage.clear()
      }

      setReady(true)

      const root = document.documentElement
      root.classList.add('utilities-html')

      return () => {
          root.classList.remove('utilities-html')
      }
   }, [])
   return ready ? (
      <ConsumptionProvider>
         <Routes>
            <Route path='/' element={<Index />} />
            <Route path='summary' element={<Summary />} />
            <Route path='contract-data' element={<ContractData />} />
            <Route path='contract-signature' element={<ContractSignature />} />
            <Route path='contract-signature-close' element={<ContractClose />} />
         </Routes>
      </ConsumptionProvider>
   ) : null
}

export default App;
