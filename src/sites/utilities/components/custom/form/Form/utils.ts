import React from 'react'
import { OnChangeFunction, OnChangeEvent } from './types'

/**
 * Combina classi CSS filtrando valori falsy
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
   return classes.filter(Boolean).join(' ')
}

/**
 * Gestisce gli eventi onChange distinguendo tra funzioni e event handlers
 */
export const handleOnChange = (
   onChange: OnChangeFunction | OnChangeEvent,
   value: string,
   name: string,
   originalEvent: React.ChangeEvent<HTMLInputElement>
) => {
   if (typeof onChange === 'function' && onChange.length === 2) {
      // È una funzione che accetta (value, name)
      ;(onChange as OnChangeFunction)(value, name)
   } else {
      // È un event handler
      const syntheticEvent = {
         ...originalEvent,
         target: {
            ...originalEvent.target,
            value,
         },
      } as React.ChangeEvent<HTMLInputElement>
      ;(onChange as OnChangeEvent)(syntheticEvent)
   }
}
