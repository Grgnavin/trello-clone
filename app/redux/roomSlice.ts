import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Room {
    id: string | null
}

const roomSlice = createSlice({
    name: "room",
    initialState: {
        id: ""
    },
    reducers: {
        setId: (state, actions: PayloadAction<any>) => {
            state.id = actions.payload
        }
    }
})
export const { setId } = roomSlice.actions;
export default roomSlice.reducer;