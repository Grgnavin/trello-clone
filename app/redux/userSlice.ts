import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    user: {
        createdAt: string;
        email: string;
        role: string 
        updatedAt: string; 
        username: string 
        __v: number
        _id: string
    } | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, actions: PayloadAction<any>) => {
                state.user = actions.payload
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;