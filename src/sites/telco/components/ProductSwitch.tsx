import { Switch } from '@/components/ui/switch'

interface ProductSwitchProps {
   description: string
   checked: boolean
   onChange: () => void
}

const ProductSwitch = ({ description, checked, onChange }: ProductSwitchProps) => (
   <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg w-full max-w-md">
      <span>{description}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
   </div>
)

export default ProductSwitch
