import { Button } from '@/components/ui/button'
import Logo from '@/assets/images/logo.png'

const Navbar = () => {
   return (
      <nav className="flex justify-between items-center border-b">
         <button onClick={() => {}}>
            <img className="h-16" src={Logo} />
         </button>{' '}
      </nav>
   )
}

export default Navbar
