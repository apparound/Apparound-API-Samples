import Text from './Text'
import Title from './Title'
import RadioBox from './RadioBox'
import Card from './Card'
import Icon from './Icon'

interface FormProps {
   children: any[]
   values?: {
      [key: string]: any
   }
   className?: string
   onChange: (value: string | number | boolean, name: string) => any
}

interface inputsI {
   [key: string]: any
}

const sizes = {
   1: 'col-span-1 lg:col-span-1',
   2: 'col-span-1 lg:col-span-2',
   3: 'col-span-1 lg:col-span-3',
   4: 'col-span-1 lg:col-span-4',
   5: 'col-span-1 lg:col-span-5',
   6: 'col-span-1 lg:col-span-6',
   7: 'col-span-1 lg:col-span-7',
   8: 'col-span-1 lg:col-span-8',
   9: 'col-span-1 lg:col-span-9',
   10: 'col-span-1 lg:col-span-10',
   11: 'col-span-1 lg:col-span-11',
   12: 'col-span-1 lg:col-span-12',
}

const inputs: inputsI = {
   Text,
   Title,
   RadioBox,
   Card,
   Icon,
}

const Form = ({ children, onChange, values, className }: FormProps) => {
   return (
      <div className={`grid grid-cols-1 lg:grid-cols-12 w-full gap-y-6 gap-x-10 ${className}`}>
         {children.map((item, index) => {
            const InputComponent = item.type === 'Form' ? Form : inputs[item.type]
            item.value = (values || {})[item.name]
            return InputComponent ? (
               <div className={`${sizes[item.size]}`} key={index}>
                  <InputComponent values={values} {...item} onChange={onChange} />
               </div>
            ) : null
         })}
      </div>
   )
}

export default Form
