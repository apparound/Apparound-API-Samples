import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SelectCap = ({ comuniByProvincia, comuneSelezionato, handleCapChange, isDisabled }) => {
   const caps = comuniByProvincia.find(comune => comune.nome === comuneSelezionato)?.cap || []

   return (
      <Select name="cap" onValueChange={handleCapChange} disabled={isDisabled}>
         <SelectTrigger>
            <SelectValue placeholder="CAP" />
         </SelectTrigger>
         <SelectContent>
            {caps.map(cap => (
               <SelectItem key={cap} value={cap}>
                  {cap}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectCap
