import { Switch } from '@/components/ui/switch'

interface ProductSwitchProps {
   description: string
   checked: boolean
   onChange: () => void
   icon: React.ReactNode
}

const ProductSwitch = ({ description, checked, onChange, icon }: ProductSwitchProps) => (
   <div className="flex items-center justify-between p-4 bg-white rounded-2xl w-full max-w-3xl shadow-md">
      <div className="flex items-center gap-3">
         {icon}
         <span className="text-black text-lg">{description}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-[#7c4bc6]" />
   </div>
)

export default ProductSwitch
