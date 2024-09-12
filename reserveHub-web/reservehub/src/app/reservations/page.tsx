"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Reservations = () => {
  const [reservationArray, setReservationArray] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //get all reservations

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
        </div>
    </>
  );
};

export default Reservations;
