"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Appointments = () => {
  const [appointment_array, setAppointmentArray] = useState([]);
  //get all appointments

  const get_appointments = () => {
    fetch("http://localhost:5000/api/apps_retrival")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
        setAppointmentArray(data.body);
      })
      .catch((error) => {
        console.error("there was a problem with the fetch operation", error);
      });
  };

  useEffect(() => {
    get_appointments();
  }, []);
  return (
    <>
      <header>
        <h1 className="text-center py-3">Appointments</h1>
      </header>
      <Link href={"/dashboard"} className="block">
        <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">
          Dashboard
        </button>
      </Link>
      <section className=" mx-auto my-3 px-6 py-3 border-2 border-slate-300">
        <div className="flex flex-row justify-between mb-4">
          <div>
            <h2>Appointments</h2>
            <p>List of Appointments with Id, name, date, time, slots</p>
          </div>
          <div className="self-center ">
            <Link href={"/appointments/createappointment"} className="mr-10">
              <span className="border-2 border-lime-400 bg-lime-600 px-3 py-1 rounded-sm hover:bg-lime-500">
                +Create
              </span>
            </Link>
          </div>
        </div>

        <table className="border-collapse table-auto mx-auto my-2">
          <thead>
            <tr>
              <th className="border border-slate-600 text-left px-2">Name</th>
              <th className="border border-slate-600 text-left px-2">Date</th>
              <th className="border border-slate-600 text-left px-2">Time</th>
              <th className="border border-slate-600 text-left px-2">Slots</th>
              <th className="border border-slate-600 text-left px-2"></th>
            </tr>
          </thead>
          <tbody>
            {appointment_array.map((appointment: any) => (
              <tr key={appointment.app_id}>
                <td className="border border-slate-600 text-left px-2">
                  {appointment.app_title}
                </td>
                <td className="border border-slate-600 text-center px-2">
                  {appointment.app_date}
                </td>
                <td className="border border-slate-600 text-center px-2">
                  {appointment.app_time}
                </td>
                <td className="border border-slate-600 text-center px-2">
                  {appointment.cur_slots}/{appointment.max_slots}
                </td>
                <td className="border border-slate-600 text-center px-2">
                  <Link href={{pathname:`/appointments/${appointment.app_id}`, query: {app_id: JSON.stringify(appointment.app_id)}}}>Edit</Link>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Appointments;
