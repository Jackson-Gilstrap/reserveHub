"use client";
// might need to bring the timer component out of this component and render it on the layout as did get error that it couldnt properly update it's state when state was changed in this component
import Link from "next/link";
import { useSelector } from "react-redux";
import ReservationFlow from "@/components/reservationFlow";
import ReservationModules from "@/components/reservationModules";

interface reservationSchema {
  reservation_location: string;
  reservation_date: string;
  reservation_time: string;
  reservation_type: string;
  reservation_duration: string;
}

const Reservation = () => {
  const questionnaireStatus = useSelector(
    (state: any) => state.global.completedQuestionnaire
  );
  const bookingStatus = useSelector(
    (state: any) => state.global.completedAppointmentSelection
  );
  const clientStatus = useSelector(
    (state: any) => state.global.completedClientDetails
  );
  const reminderStatus = useSelector(
    (state: any) => state.global.completedReminders
  );
  const reservation = useSelector((state: any) => state.reservation);

  const handleBooking = async () => {
    fetch("http://localhost:5000/api/createReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(reservation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("error message", error.message);
      });
  };

  return (
    <>
      <div>
        <Link href={"/dashboard"}>
          <div
            className={
              "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
            }
          >
            <h3>Return to Dashboard &lt;--</h3>
          </div>
        </Link>
      </div>

      <ReservationFlow
        questionnaire_status={questionnaireStatus}
        booking_status={bookingStatus}
        client_status={clientStatus}
        reminder_status={reminderStatus}
      />
      <ReservationModules
        questionnaire_status={questionnaireStatus}
        booking_status={bookingStatus}
        client_status={clientStatus}
        reminder_status={reminderStatus}
      />
      <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h3 className="text-center text-2xl font-semibold mb-6">
          Reservation Details
        </h3>
        <div className="border-4 border-slate-400 rounded-lg p-6 flex flex-col md:flex-row justify-center gap-6 bg-gray-900">
          {/* Left Section - Reservation Details */}
          <div className="flex-auto border-b-2 md:border-b-0 md:border-r-2 border-white px-5 py-3">
            <p className="mb-2">
              <span className="font-bold">Location:</span>{" "}
              {reservation.reservationLocation}
            </p>
            <p className="mb-2">
              <span className="font-bold">Date:</span>{" "}
              {reservation.reservationDate}
            </p>
            <p className="mb-2">
              <span className="font-bold">Time:</span>{" "}
              {reservation.reservationTime}
            </p>
            <p className="mb-2">
              <span className="font-bold">Type:</span>{" "}
              {reservation.reservationType}
            </p>
          </div>

          {/* Right Section - Personal Details */}
          <div className="flex-auto px-5 py-3">
            <p className="mb-2">
              <span className="font-bold">Name:</span>{" "}
              {reservation.reservationGivenName}{" "}
              {reservation.reservationSurname}
            </p>
            <p className="mb-2">
              <span className="font-bold">Phone Number:</span>{" "}
              {reservation.reservationPhoneNumber}
            </p>
            <p className="mb-2">
              <span className="font-bold">Zipcode:</span>{" "}
              {reservation.reservationZipcode}
            </p>
          </div>
        </div>

        {/* Booking Button */}
        {questionnaireStatus &&
          bookingStatus &&
          clientStatus &&
          reminderStatus && (
            <Link href={"/summary"}>
              <button
                className="bg-blue-500 text-white font-semibold block text-center max-w-xs mx-auto mt-8 px-6 py-3 rounded-lg hover:bg-blue-400 transition duration-300"
                onClick={handleBooking}
              >
                Book
              </button>
            </Link>
          )}
      </div>
    </>
  );
};

export default Reservation;
