import { configureStore } from "@reduxjs/toolkit";
import globalReducer from './features/global/globalSlice';
import reservationReducer from './features/reservation/reservationSlice';
import userReducer from './features/user/userSlice';

export const makeStore = ()=> {
    return configureStore({

        reducer: {
            global: globalReducer,
            reservation: reservationReducer,
            user: userReducer,
            // timer: timerReducer,
        },
    })
}