import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

const SelectProvincia = ({ province, handleProvinceChange }) => {
   const { t } = useTranslation()
   return (
      <Select name="provincia" onValueChange={handleProvinceChange}>
         <SelectTrigger>
            <SelectValue placeholder={t('Provincia')} />
         </SelectTrigger>
         <SelectContent>
            {province.map(provincia => (
               <SelectItem
                  key={provincia}
                  value={provincia}
                  className="data-[state=checked]:bg-[#f4f4f4] data-[highlighted]:bg-[#f4f4f4]"
               >
                  {provincia}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectProvincia
