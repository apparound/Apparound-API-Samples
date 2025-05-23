import Logo from '@/assets/images/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { selectTofList } from '@/sites/retail/features/quoteSlice'
import { getProductsFromTof } from '@/sites/telco/hooks/apparoundData'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
   showTofList?: boolean
}

const Navbar = ({ showTofList = false }: NavbarProps) => {
   const tofList = useSelector(selectTofList)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   return (
      <nav className="flex justify-between items-center border-b px-4">
         <button
            onClick={() => {
               window.location.href = '/'
            }}
            className="float-left"
         >
            <img src={Logo} alt="Apparound Logo" className="h-16" />
         </button>
         {showTofList && (
            <div className="flex gap-2">
               {tofList?.map(item => (
                  <button
                     key={item.name}
                     className="uppercase text-primary font-bold px-3 py-1 rounded bg-transparent border-none shadow-none hover:bg-transparent focus:bg-transparent"
                     style={{ boxShadow: 'none' }}
                     onClick={async () => {
                        await getProductsFromTof(dispatch, item.id)
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
