"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Reservations = () => {
  const [reservationArray, setReservationArray] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //get all reservations

  const formatDate = (date: string) => {
    let tempArr = date.split("T");
    return tempArr[0];
  };
  const formatTime = (time: string) => {
    let tempArr = time.split(":");
    const hour: number = parseInt(tempArr[0]);
    const minute: string = tempArr[1];
    
    if (hour > 12) {
      //convert hour substract 12 to get non mil time then convert to string then make new string
      //append a PM at the end of string and build a new string
      const newHour: string = (hour - 12).toString();
      const timeStr = `${newHour}:${minute} PM`;
      return timeStr;
    } else if (hour == 12) {
      //dont substract create new hour variable
      const newHour: string = hour.toString();
      const timeStr = `${newHour}:${minute} PM`;
      return timeStr;
    } else {
      //if hour is in morning
      const newHour: string = hour.toString();
      const timeStr = `${newHour}:${minute} AM`;
      return timeStr;
    }
  };
  const get_reservations = () => {
    fetch("http://localhost:5000/api/res-retrival")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Network request unsuccessful: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.body)
        setReservationArray(data.body);
        setFilteredReservations(data.body)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      });
  };

  const filterReservations = (bookingref:string)=> {
    const filtered = reservationArray.filter((reservation:any) =>
        reservation.booking_ref
          .toLowerCase()
          .includes(bookingref.toLowerCase())
      );
      setFilteredReservations(filtered);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterReservations(value)
  };

  useEffect(() => {
    get_reservations();
  }, []);

  return (
    <>
      <header>
        <h1>Reservations</h1>
      </header>
      <Link href={"/dashboard"} className="block">
        <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">
          Dashboard
        </button>
      </Link>
      <div className="flex flex-col justify-between mb-4">
          <div>
            <h2>Reservations</h2>
            <p>List of Reservations with Booking reference, appointment_id, client_id, date, time, type, location</p>
          </div>
          <div id="search bar">
            <label htmlFor="search-booking-ref">Search</label>
            <input name="search-booking-ref" id="search-booking-ref" type="text" placeholder="Booking Ref" value={searchTerm} onChange={handleSearch}/>
          </div>
          <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Reservations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left text-gray-600 font-semibold">Booking Reference</th>
              <th className="px-4 py-2 border-b text-left text-gray-600 font-semibold">App ID</th>
              <th className="px-4 py-2 border-b text-left text-gray-600 font-semibold">Client ID</th>
              <th className="px-4 py-2 border-b text-left text-gray-600 font-semibold">Date</th>
              <th className="px-4 py-2 border-b text-left text-gray-600 font-semibold">Time</th>
              <th className="px-4 py-2 border-b text-left text-gray-600 font-semibold">Location</th>
              <th className="px-4 py-2 border-b text-left text-gray-600 font-semibold">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation:any, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-black">{reservation.booking_ref}</td>
                <td className="px-4 py-2 border-b text-black">{reservation.app_id}</td>
                <td className="px-4 py-2 border-b text-black">{reservation.client_id}</td>
                <td className="px-4 py-2 border-b text-black">{formatDate(reservation.res_date)}</td>
                <td className="px-4 py-2 border-b text-black">{formatTime(reservation.res_time)}</td>
                <td className="px-4 py-2 border-b text-black">{reservation.res_location}</td>
                <td className="px-4 py-2 border-b text-black">{reservation.res_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </div>
    </>
  );
};

export default Reservations;
