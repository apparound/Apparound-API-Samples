import StepIndicator from '@/sites/utilities/components/custom/StepIndicator'

const MainContainer = ({ children }) => {
   return (
      <main className="w-full flex-1 overflow-auto py-10 flex">
         {children}
      </main>
   )
}

export default MainContainer
