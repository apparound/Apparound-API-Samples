import { Button } from '@/components/ui/button'
import Logo from '@/assets/images/logo.png'

const Navbar = () => {
   return (
      <nav className="flex justify-between items-center border-b">
         <button
            onClick={() => {
               window.location.href = '/'
            }}
            className="float-left"
         >
            <img src={Logo} alt="Apparound Logo" className="h-16" />
         </button>
      </nav>
   )
}

export default Navbar
