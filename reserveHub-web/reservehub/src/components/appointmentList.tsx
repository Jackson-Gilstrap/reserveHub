"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppointmentList = ({ location_name }: any) => {
  const dispatch = useDispatch();
  const [appointmentList, setAppointmentList] = useState<any>([]);
  //create functions to get appointments based on location_name and link api
  const getAppointments = () => {
    fetch(
      `http://localhost:5000/api/apps_retrival_by_location/${location_name}`
    ) // need to update the api to support by date and location name not just location name both on front and backend.
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
        setAppointmentList(data.body);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <button
        onClick={getAppointments}
        className="bg-green-500 text-white mx-auto font-semibold px-4 py-2 rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
      >
        Load
      </button>
      {location_name && (
        <div className="border-2 border-white flex flex-column justify-evenly py-2">
          {appointmentList && appointmentList.length > 0 ? (
            appointmentList.map((appointment: any) => (
              <div
                key={appointment.app_id}
                className="border rounded-lg p-4 mb-4 shadow-lg w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {appointment.app_title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {appointment.app_type}
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <p>
                    <strong>Date:</strong> {appointment.app_date}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.app_time}
                  </p>
                  <p>
                    <strong>Location:</strong> {appointment.app_location}
                  </p>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <p>
                    <strong>Status:</strong> {appointment.app_status}
                  </p>
                  <p>
                    <strong>Slots:</strong> {appointment.cur_slots}/
                    {appointment.max_slots}
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                  Reserve
                </button>
              </div>
            ))
          ) : (
            <div>
              <p>There are no appointments at {location_name}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AppointmentList;
