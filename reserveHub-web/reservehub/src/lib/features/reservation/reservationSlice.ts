import { createSlice } from "@reduxjs/toolkit";

interface State {
  reservationGivenName: string;
  reservationSurname: string;
  reservationPhoneNumber: string;
  reservationZipcode: string;
  reservationDate: string;
  reservationTime: string;
  reservationLocation: string;
  reservationType: string;
  reservationDuration: string;
}

const initialState: State = {
  reservationGivenName: "",
  reservationSurname: "",
  reservationPhoneNumber: "",
  reservationZipcode: "",
  reservationDate: "",
  reservationTime: "",
  reservationLocation: "",
  reservationType: "",
  reservationDuration: "",
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setGivenName: (state, action) => {
      state.reservationGivenName = action.payload;
    },
    setSurname: (state, action) => {
      state.reservationSurname = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.reservationPhoneNumber = action.payload;
    },
    setZipcode: (state, action) => {
      state.reservationZipcode = action.payload;
    },

    setDate: (state, action) => {
      state.reservationDate = action.payload;
    },

    setTime: (state, action) => {
      state.reservationTime = action.payload;
    },
    setLocation: (state, action) => {
      state.reservationLocation = action.payload;
    },

    setDuration: (state, action) => {
      state.reservationDuration = action.payload;
    },
    setType: (state, action) => {
      state.reservationType = action.payload;
    },
  },
});


export const {
    setLocation,
    setDate,
    setTime,
    setType,
    setDuration,
    setGivenName,
    setSurname,
    setPhoneNumber,
    setZipcode,
} = reservationSlice.actions;
export default reservationSlice.reducer;
