"use client";
// creating the flow for a client to look up their reservation
//one splash screen with title and details with search button.
//will render/route on success with the clients reservation
//on Faliure will render a block saying error message or no reservation found
import Link from "next/link";
import { useState } from "react";
import SearchBoxes from "../../components/searchReservation"

const ViewClientReservation = () => {
  return (
    <>
      <h1>View Reservation</h1>
      <Link href={"/dashboard"}>
        <div
          className={
            "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
          }
        >
          <h3>Dashboard &lt;--</h3>
        </div>
      </Link>
      <h2>Enter a few details -- Find your reservation</h2>
      <SearchBoxes/>

    </>
  );
};

export default ViewClientReservation;
