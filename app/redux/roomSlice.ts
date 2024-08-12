import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Room {
    id: string | null
}

const roomSlice = createSlice({
    name: "room",
    initialState: {
        id: "",
        name: ""
    },
    reducers: {
        setId: (state, actions: PayloadAction<any>) => {
            state.id = actions.payload
        },
        setName: (state, actions: PayloadAction<any>) => {
            state.name = actions.payload
        }
    }
})
export const { setId, setName } = roomSlice.actions;
export default roomSlice.reducer;