// === EXPORTS ===

// Types
export type { TextProps, OnChangeFunction, OnChangeEvent } from './types'

// Constants
export { DATE_DISPLAY_REGEX, DATE_ISO_REGEX } from './constants'

// Date utilities
export { formatDateToDisplay, formatDateToISO, formatDateInput } from './dateUtils'

// General utilities
export { cn, handleOnChange } from './utils'

// Hooks
export { useDateInput } from './hooks'

// Event handlers
export { handleDateChange, handleRegularChange, handleDateFocus, handleDateBlur } from './eventHandlers'

// Styling utilities
export { getInputClasses, getLabelClasses } from './styles'
