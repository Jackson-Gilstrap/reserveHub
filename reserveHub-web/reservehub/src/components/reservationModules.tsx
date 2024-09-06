"use client";

import Link from "next/link";

const ReservationModules = (props: {
  questionnaire_status: any;
  booking_status: any;
  client_status: any;
  reminder_status: any;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10 my-4">
        <Link href={"/reservation/questionnaire"}>
          <div className="border-2 border-white px-4 py-6 bg-gray-800 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Our Questionnaire</h2>
            <p className="mt-2">
              Complete this to find out if you are eligible for our services
            </p>
            <p className="text-right mt-4">Prerequistes: None</p>
          </div>
        </Link>
        <Link
          aria-disabled={props.questionnaire_status}
          href={props.questionnaire_status ? "/reservation/booking" : "#"}
        >
          <div className="border-2 border-white px-4 py-6 bg-gray-800 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Select Your Appointment</h2>
            <p className="mt-2">
              Complete this to select your desired appointment
            </p>
            <p className="text-right mt-4">
              Prerequistes: Complete Questionnaire
            </p>
          </div>
        </Link>
        <Link
          aria-disabled={props.questionnaire_status && props.booking_status}
          href={
            props.questionnaire_status && props.booking_status ? "/reservation/client" : "#"
          }
        >
          <div className="border-2 border-white px-4 py-6 bg-gray-800 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">
              Enter Your Personal Information
            </h2>
            <p className="mt-2">
              Complete this to enter your personal information
            </p>
            <p className="text-right mt-4">Prerequistes: Complete Booking</p>
          </div>
        </Link>
        <Link
          aria-disabled={props.questionnaire_status && props.booking_status && props.client_status}
          href={
            props.questionnaire_status && props.booking_status && props.client_status
              ? "/reservation/reminders"
              : "#"
          }
        >
          <div className="border-2 border-white px-4 py-6 bg-gray-800 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">View Reminders</h2>
            <p className="mt-2">
              Complete this to view reminders before your appointment
            </p>
            <p className="text-right mt-4">
              Prerequistes: Complete Personal Information
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};


export default ReservationModules;