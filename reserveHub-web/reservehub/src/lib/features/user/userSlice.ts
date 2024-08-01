import { createSlice } from "@reduxjs/toolkit";

interface State {
    isUserLoggedIn: boolean;
    userType: string | null;
    userDetails: object;
}

const initialState: State = {
    isUserLoggedIn: false,
    userType: null,
    userDetails: {}
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isUserLoggedIn = true;
            state.userType = action.payload.userType;
            state.userDetails = action.payload.userDetails;
          },
          clearUser: (state) => {
            state.isUserLoggedIn = false;
            state.userType = null;
            state.userDetails = {};
          },
    }

})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;