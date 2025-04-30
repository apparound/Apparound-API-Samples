import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const CheckCoverage = () => {
   return (
      <div className="bg-white rounded-lg shadow p-6">
         <h3 className="text-xl font-semibold text-primary mb-4">Verifica copertura</h3>
         <p className="text-gray-600 mb-6">
            Inserisci il tuo indirizzo, poi verifica la copertura per visualizzare la migliore tecnologia disponibile
            per te
         </p>
         <form className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
               <Select>
                  <SelectTrigger>
                     <SelectValue placeholder="Provincia" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="pisa">Pisa</SelectItem>
                     <SelectItem value="roma">Roma</SelectItem>
                     <SelectItem value="milano">Milano</SelectItem>
                  </SelectContent>
               </Select>
               <Select>
                  <SelectTrigger>
                     <SelectValue placeholder="Comune" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="pisa">Pisa</SelectItem>
                     <SelectItem value="cascina">Cascina</SelectItem>
                  </SelectContent>
               </Select>
               <Input placeholder="CAP" />
            </div>
            <Input placeholder="Indirizzo e numero civico" />
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">VERIFICA COPERTURA</Button>
         </form>
      </div>
   )
}

export default CheckCoverage
