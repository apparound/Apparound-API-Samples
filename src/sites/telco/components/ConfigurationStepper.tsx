import { Check, Circle } from 'lucide-react'

type Step = {
   label: string
   completed: boolean
   current: boolean
}

const steps: Step[] = [
   { label: 'Configura', completed: true, current: false },
   { label: 'Scopri', completed: false, current: true },
   { label: 'Attiva', completed: false, current: false },
   { label: 'Inserisci dati', completed: false, current: false },
   { label: 'Fine', completed: false, current: false },
]

const ConfigurationStepper = () => {
   return (
      <div className="flex justify-center items-center gap-2 p-4 bg-white">
         {steps.map((step, index) => (
            <div key={step.label} className="flex items-center">
               <div className="flex flex-col items-center">
                  <div
                     className={`flex items-center justify-center w-6 h-6 rounded-full mb-1
              ${
                 step.completed
                    ? 'bg-green-500'
                    : step.current
                    ? 'border-2 border-purple-600'
                    : 'border-2 border-gray-300'
              }`}
                  >
                     {step.completed ? (
                        <Check className="w-4 h-4 text-white" />
                     ) : (
                        <Circle className={`w-3 h-3 ${step.current ? 'text-primary' : 'text-gray-300'}`} />
                     )}
                  </div>
                  <span className={`text-xs ${step.current ? 'text-primary font-medium' : 'text-gray-500'}`}>
                     {step.label}
                  </span>
               </div>
               {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
               )}
            </div>
         ))}
      </div>
   )
}

export default ConfigurationStepper
