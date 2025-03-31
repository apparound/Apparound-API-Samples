import { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode,
    className?: string
}

const Section = ({ children, className }: SectionProps) => {
    return (
        <div className={`${className} w-full`}>
            {children}
        </div>
    )
}

export default Section
