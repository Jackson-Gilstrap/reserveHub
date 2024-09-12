"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAppointmentSelectionStatus } from "@/lib/features/global/globalSlice";

import {
  setLocation,
  setDate,
  setTime,
  setType,
} from "@/lib/features/reservation/reservationSlice";
import Calendar from "react-calendar";
import Link from "next/link";

const Calendar_ = ({ location_arr }: any) => {
  const [showAppointments, setShowAppointments] = useState<Boolean>(false);
  const [selected_location_name, set_selected_location_name] =
    useState<String | null>(null);
  const [isBookingSelected, setIsBookingSelected] = useState<Boolean>(false);
  const [appointment_arr, setAppointmentArr] = useState<Object[]>([]);

  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const location_name: string = searchParams.get("location_name") ?? "";

  interface Location {
    location_id: number;
    location_name: string;
    location_street_address: string;
    location_city: string;
    location_state: string;
    location_zipcode: string;
  }

  //first stage select location
  const handleLocationSelection = async (location: Location) => {
    await set_selected_location_name(location.location_name);
    console.log(location);
  };
  
  const onChange = (appointment_arr: any) => {
    console.log("date clicked");
    // const filtered_appointment_arr = appointment_arr.filter
  };

  const handleAppointmentRefresh = async (location_name: any) => {
    await fetch(
      `http://localhost:5000/api/apps_retrival_by_location/${location_name}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
        setAppointmentArr(data.body);
        if (appointment_arr.length > 0) {
          setShowAppointments(true);
          console.log("appointment array: ", appointment_arr);
        } else {
          setShowAppointments(false);
          console.log("appointment array: ", appointment_arr);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBooking = (appointment_arr: any, appointment_id: any) => {
    const appointment = appointment_arr.find(
      (app: any) => app.app_id === appointment_id
    );
    console.log(appointment);
    const { app_time, app_type } = appointment;
    dispatch(setLocation(selected_location_name));
    dispatch(setTime(app_time));
    dispatch(setType(app_type));
    setIsBookingSelected(true);
    console.log("Confirming booking proceeding!");
  };
  const handleSuccessfullBooking = () => {
    console.log("Successful booking");
    dispatch(setAppointmentSelectionStatus(true));
  };

  useEffect(() => {
    handleAppointmentRefresh(selected_location_name);
  }, [location_name]);
  return (
    <div>
      <h2 className={"text-center my-3 mx-auto"}>
        Select your preferred location
      </h2>
      <div
        className={
          "border-2 border-white text-center mx-20 my-4 px-5 py-2 flex flex-row"
        }
      >
        {location_arr.map((location: any) => (
          <div
            key={location.location_id}
            onClick={() => handleLocationSelection(location)}
            className={
              "border-2 border-white  max-w-60 mx-auto my-1 px-2 py-2 rounded-sm justify-center hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
            }
          >
            {location.location_name}
          </div>
        ))}
      </div>
      <p className={"text-center my-3 mx-auto"}>
        Showing appointments for {selected_location_name}
      </p>
      <button
        onClick={() => handleAppointmentRefresh(selected_location_name)}
        className={
          "bg-black text-sky-600 block text-center max-w-48 mx-auto my-5 px-4 py-2 border-2 border-blue-400 rounded-md hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
        }
      >
        Refresh
      </button>
      <p className={"text-center my-1 mx-auto"}>
        To refresh appointments click refresh
      </p>
      <Calendar
        onChange={() => onChange(appointment_arr, )}
        value={new Date()}
        className={"mx-20 border-2 border-white px-5 py-2"}
      />
      {showAppointments && (
        <div>
          {appointment_arr.map((appointment: any) => (
            <div
              key={appointment.app_id}
              className={"border-white border-2 mx-20 my-2 py-3 px-3"}
            >
              <h4>{appointment.app_title}</h4>
              <span>Time: {appointment.app_time}</span>&nbsp;&nbsp;
              <span>Date: {appointment.app_date}</span>&nbsp;&nbsp;
              <p>Appointment Type: {appointment.app_type}</p>
              <p className={"text-right"}>
                Spots Filled: {appointment.cur_slots}/{appointment.max_slots}
              </p>
              <button
                disabled={appointment.cur_slots === appointment.max_slots}
                onClick={() =>
                  handleBooking(appointment_arr, appointment.app_id)
                }
                className={
                  appointment.cur_slots !== appointment.max_slots
                    ? "bg-black text-sky-600 block text-center max-w-48   my-2 px-1 py-.5 border-2 border-blue-400 rounded-lg hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
                    : "bg-black text-sky-600 block text-center max-w-48   my-2 px-1 py-.5 border-2 border-blue-400 rounded-lg"
                }
              >
                Reserve
              </button>
            </div>
          ))}
        </div>
      )}
      <Link href={"/reservation"}>
        <button
          disabled={!isBookingSelected}
          onClick={handleSuccessfullBooking}
          className={
            "bg-black text-sky-600 block text-center max-w-48 mx-20 my-5 px-4 py-2 border-2 border-blue-400 rounded-md hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
          }
        >
          Proceed
        </button>
      </Link>
    </div>
  );
};

export default Calendar_;
