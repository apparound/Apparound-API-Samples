import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showPageLoader: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reset: () => {
            return initialState
        },
        showLoader: (state) => {
            state.showPageLoader = true
        },
        hideLoader: (state) => {
            state.showPageLoader = false
        }
    }
})

export const selectShowHeaderImage = state => state.app.showHeaderImage
export const selectShowPageLoader = state => state.app.showPageLoader

export const { reset, showLoader, hideLoader } = appSlice.actions

export default appSlice.reducer
