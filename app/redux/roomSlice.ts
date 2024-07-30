import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Room {
    id: string | null
}

const roomSlice = createSlice({
    name: "room",
    initialState: {
        id: null
    } as Room,
    reducers: {
        setId: (state, actions: PayloadAction<string>) => {
            state.id = actions.payload
        }
    }
})
export const { setId } = roomSlice.actions;
export default roomSlice.reducer;