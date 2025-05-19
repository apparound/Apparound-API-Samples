import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SelectProvincia = ({ province, handleProvinceChange }) => {
   return (
      <Select name="provincia" onValueChange={handleProvinceChange}>
         <SelectTrigger>
            <SelectValue placeholder="Provincia" />
         </SelectTrigger>
         <SelectContent>
            {province.map(provincia => (
               <SelectItem key={provincia} value={provincia}>
                  {provincia}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectProvincia
