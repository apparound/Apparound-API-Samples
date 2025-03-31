import { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import Index from '@/sites/retail/pages/Index'
import Calculate from '@/sites/retail/pages/Calculate'
import Configure from '@/sites/retail/pages/Configure'
import Cart from '@/sites/retail/pages/Cart'
import PageLoader from '@/sites/retail/components/PageLoader'
import Header from '@/sites/retail/components/Header'
import Footer from '@/components/Footer'
import { selectTree } from '@/sites/retail/features/quoteSlize'
import './App.css'
import useRelativeNavigate from '@/utils/navigate'
import Contract from './pages/Contract'

const Inner = () => {
    const navigate = useRelativeNavigate()
    const tree = useSelector(selectTree)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        const root = document.documentElement
        root.classList.add('retail-html')

        return () => {
            root.classList.remove('retail-html')
        }
    }, [])

    useEffect(() => {
        if (!tree?.length && window.location.pathname !== '/retail') {
            navigate('')
        } else if (!ready) {
            setReady(true)
        }
    })

    return ready ? (
        <div className='flex flex-col h-full m-h-full'>
            <PageLoader />
            <Header />
            <div className='flex-1 overflow-y-auto relative'>
                <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/calculate' element={<Calculate />} />
                    <Route path='/configure' element={<Configure />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/contract' element={<Contract />} />
                </Routes>
            </div>
            <Footer />
        </div>
    ) : null
}

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Inner />
            </PersistGate>
        </Provider>
    )
}

export default App
