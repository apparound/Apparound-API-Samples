import { Switch } from '@/components/ui/switch'

const MobileOfferOptions = () => {
   return (
      <div className="space-y-4 mb-12">
         <h3 className="text-xl font-semibold text-primary mb-4">Opzioni offerta Mobile</h3>
         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>Portabilità del numero</span>
            <Switch />
         </div>
         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>Modem incluso</span>
            <Switch />
         </div>
      </div>
   )
}

export default MobileOfferOptions
