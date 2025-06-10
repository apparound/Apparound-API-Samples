import Logo from '@/assets/images/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { selectTofId, selectTofList } from '@/sites/retail/features/quoteSlice'
import { getProductsFromTof } from '@/sites/telco/hooks/apparoundData'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
   showTofList?: boolean
   onSelectMainProduct?: (guid: string) => void // nuova prop opzionale
}

const Navbar = ({ showTofList = false, onSelectMainProduct }: NavbarProps) => {
   const tofList = useSelector(selectTofList)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const currentTofId = useSelector(selectTofId)

   return (
      <nav className="flex flex-col md:flex-row justify-between items-center border-b px-4 py-2">
         <button
            onClick={() => {
               window.location.href = '/'
            }}
            className="mx-auto md:mx-0 mb-2 md:mb-0"
         >
            <img src={Logo} alt="Apparound Logo" className="h-16 object-cover" />
         </button>
         {showTofList && (
            <div className="flex gap-2 flex-wrap justify-center md:justify-start w-full md:w-auto">
               {tofList?.map(item => (
                  <button
                     key={item.name}
                     className={`uppercase text-primary px-3 py-1 rounded bg-transparent border-none shadow-none hover:bg-transparent focus:bg-transparent${
                        item.id === currentTofId ? ' font-extrabold' : 'font-light'
                     }`}
                     style={{ boxShadow: 'none' }}
                     onClick={async () => {
                        await getProductsFromTof(dispatch, item.id)
                        if (onSelectMainProduct) {
                           onSelectMainProduct(item.id)
                        }
                        navigate('/telco/configure-offer')
                     }}
                  >
                     {item.name}
                  </button>
               ))}
            </div>
         )}
      </nav>
   )
}

export default Navbar
