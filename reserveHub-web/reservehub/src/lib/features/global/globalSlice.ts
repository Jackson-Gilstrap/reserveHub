import { createSlice } from "@reduxjs/toolkit";

interface State {
    completedQuestionnaire : boolean;
    completedAppointmentSelection: boolean;
    completedClientDetails: boolean;
    completedReminders: boolean;
    isLoggedIn: boolean;
}

const initialState: State = {
    completedQuestionnaire: false,
        completedAppointmentSelection: false,
        completedClientDetails: false,
        completedReminders: false,
        isLoggedIn: false,
}

const globalSlice = createSlice({
    name:'global',
    initialState,
    reducers: {
        setQuestionnaireStatus: (state,action) => {
            state.completedQuestionnaire = action.payload;
        },

        setAppointmentSelectionStatus: (state, action) => {
            state.completedAppointmentSelection = action.payload;
        },

        setClientDetailsStatus: (state, action) => {
            state.completedClientDetails = action.payload;
        },

        setReminderStatus: (state,action) => {
            state.completedReminders = action.payload;
        },

        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
})


export const {
    setQuestionnaireStatus,
    setAppointmentSelectionStatus,
    setClientDetailsStatus,
    setReminderStatus,
    setIsLoggedIn,
} = globalSlice.actions

export default globalSlice.reducer;