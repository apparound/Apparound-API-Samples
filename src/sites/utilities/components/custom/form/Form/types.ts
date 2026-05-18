import React from 'react'

export type OnChangeFunction = (value: string | number | boolean, name: string) => any
export type OnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => void

export interface TextProps {
   name: string
   label: string
   inputType?: string
   required?: boolean
   value?: string
   min?: string
   className?: string
   labelClassName?: string
   onChange: OnChangeFunction | OnChangeEvent
   onFocus?: (event: React.FocusEvent<HTMLInputElement>, name: string) => void
   onBlur?: (event: React.FocusEvent<HTMLInputElement>, name: string) => void
   readonly?: boolean
   formSubmitted?: boolean
}
