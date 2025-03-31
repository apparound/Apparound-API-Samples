import React, { ReactNode } from 'react'

interface BoxProps {
   children: ReactNode
   className?: string
}

const Box = ({ children, className = '' }: BoxProps) => {
   return <div className={`bg-white/80 p-8 mb-2 ${className}`}>{children}</div>
}

export default Box
