import { tourData } from "@/types/response";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { tourData: tourData | null } = {
    tourData: null
}
export const bookSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        saveTour: (state, { payload }: PayloadAction<tourData>) => {
            state.tourData = payload
        },
        clearTourData: (state) => { state.tourData = null }
    }
})
export const { saveTour, clearTourData } = bookSlice.actions
export default bookSlice.reducer