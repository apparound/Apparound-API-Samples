import { useEffect } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/assets/styles/landing.css'
import Bg from '@/assets/images/homepage-background.png'
import { useTranslation } from 'react-i18next'
import utilities from '@/assets/images/GasLuceSquare.jpg'
import retail from '@/assets/images/retail_tile.png'

const sites = {
    utilities,
    retail
}

const Landing = () => {
    const { t } = useTranslation()
    useEffect(() => {
        const root = document.documentElement
        root.classList.add('landing-html')

        return () => {
            root.classList.remove('landing-html')
        }
    }, [])

    return (
        <div className='flex flex-col h-full m-h-full'>
            <Header />
            <div className='flex flex-col flex-1 overflow-y-auto relative border-b border-[#ffffff] py-14 gap-2' style={{ backgroundImage: `url(${Bg})`, backgroundSize: 'cover' }}>
                <div className='container'>
                    <div className='text-3xl font-bold'>{t('Trasforma il tuo business con Apparound API Services')}</div>
                    <div className='text-xl'>{t('Scopri come personalizzare i tuoi journey di vendita attraverso i nostri esempi')}</div>
                    <div className='flex flex-col sm:flex-row w-full justify-center gap-10 py-6 sm:py-20'>
                        {Object.entries(sites).map(([site, image], index) =>
                        {
                            return (
                                <button
                                    key={index}
                                    onClick={() => { window.location.href = `/${site}` }}
                                    className='flex w-full sm:w-[250px] flex-col rounded-[10px] bg-[#ffffff] border-b-[10px] border-primary shadow-[0_0_10px_rgba(0,0,0,0.30)] overflow-hidden'>
                                    <div className='h-0 pt-[100%] relative w-full'>
                                        <img className='object-cover h-full absolute top-0 left-0 right-0 bottom-0 w-[100%] h-[100%]' src={image} />
                                    </div>
                                    <div className='uppercase px-6 py-2 font-bold text-primary w-full'>{t(site)}</div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Landing
