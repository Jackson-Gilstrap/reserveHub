"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "@/components/datePicker";
import LocationPicker from "@/components/locationPicker";
import AppointmentList from "@/components/appointmentList";

const BookingPage = () => {
  
  const reservation = useSelector((state: any) => state.reservation);
  const selectedDate: string = reservation.reservationDate
  const selectedLocation: string = reservation.reservationLocation
  
  return (
    <>
      <Link href={"/reservation"}>
        <div
          className={
            "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
          }
        >
          <h3>Return Home &lt;--</h3>
        </div>
      </Link>
      <DatePicker />
      <LocationPicker date={selectedDate} />
      <AppointmentList location_name={selectedLocation} date={selectedDate}/>
    </>
  );
};

export default BookingPage;
