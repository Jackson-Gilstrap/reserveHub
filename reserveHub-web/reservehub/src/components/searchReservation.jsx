"use client";
import { useState } from "react";
//need a two forms with a booking reference or last name, phone number, zipcode

const SearchWithBookingRef = () => {
  const [bookingRef, setBookingRef] = useState("");

  const handleSearchWithBookingRef = () => {
    fetch(
      `http://localhost:5000/api/search-bookingref/?bookingRef=${bookingRef}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        console.log("Response Booking: ", response);
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div>
        <h2>Search With Booking Ref</h2>
        <div>
          <input
            name="searchbookref"
            id="searchbookref"
            type="text"
            placeholder="BookingRef"
            autoFocus
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            className="text-black"
          />
          <button onClick={handleSearchWithBookingRef}>Search</button>
        </div>
      </div>
    </>
  );
};

const SearchWithClientDetails = () => {
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleSearchWithClientDetails = () => {
    fetch(
      `http://localhost:5000/api/search-client-details/?lastname=${lastname}&phonenumber=${phoneNumber}&zipcode=${zipcode}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        console.log("Response Client: ", response);
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div>
        <h2>Search With Your Details</h2>
        <div>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className={"text-black"}
          />
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            placeholder="111-111-1111"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={"text-black"}
          />
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            placeholder="12345"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className={"text-black"}
          />
          <button onClick={handleSearchWithClientDetails}>Search</button>
        </div>
      </div>
    </>
  );
};

const SearchBoxes = () => {
  return (
    <>
      <div>
        <SearchWithBookingRef />
        <SearchWithClientDetails />
      </div>
    </>
  );
};

export default SearchBoxes;
