"use client";
// might need to bring the timer component out of this component and render it on the layout as did get error that it couldnt properly update it's state when state was changed in this component
import Link from "next/link";
import { useSelector } from "react-redux";

interface reservationSchema {
    reservation_location:string;
    reservation_date:string;
    reservation_time:string;
    reservation_type:string;
    reservation_duration:string;


}


const Reservation = () => {
  const questionnaireStatus = useSelector(
    (state:any) => state.global.completedQuestionnaire
  );
  const bookingStatus = useSelector(
    (state:any) => state.global.completedAppointmentSelection
  );
  const clientStatus = useSelector(
    (state:any) => state.global.completedClientDetails
  );
  const reminderStatus = useSelector(
    (state:any) => state.global.completedReminders
  );
  const reservation = useSelector((state:any) => state.reservation);

  const handleBooking = async () => {
        fetch("http://localhost:5000/api/createReservation", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
            body: JSON.stringify(reservation)
        }).then(response => {
            if(!response.ok) {
                throw new Error("Network request unsuccessful")
            }
            return response.json()
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.error("error message", error.message)
        })
      
    
  }

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
      <div className={" grid grid-cols-4 gap 1"}>
        <div className={"col-auto max-w-80 mx-5 text-sm text-nowrap"}>
          <p className={"my-4"}>
            Completed Questionnaire:{" "}
            {questionnaireStatus.toString().toUpperCase()}
          </p>
          <p className={"my-4"}>
            Completed Appointment Selection:{" "}
            {bookingStatus.toString().toUpperCase()}
          </p>
          <p className={"my-4"}>
            Completed Client Details: {clientStatus.toString().toUpperCase()}
          </p>
          <p className={"my-4"}>
            Completed Reminders Confirmation:{" "}
            {reminderStatus.toString().toUpperCase()}
          </p>
        </div>
        <div className={"col-span-3"}>
          <Link href={"/reservation/questionnaire"}>
            <div className={"border-2 border-white px-2 py-2 mx-10 my-1 "}>
              <h2>Our Questionnaire</h2>
              <p>
                Complete this to find out if you are eligible for our services
              </p>
              <p className={"text-right"}>Prerequistes: None</p>
            </div>
          </Link>
          <Link
            aria-disabled={questionnaireStatus}
            href={questionnaireStatus ? "/reservation/booking" : "#"}
          >
            <div className={"border-2 border-white px-2 py-2  mx-10 my-1 "}>
              <h2>Select Your Appointment</h2>
              <p>Complete this to select your desired appointment</p>
              <p className={"text-right"}>
                Prerequistes: Complete Questionnaire
              </p>
            </div>
          </Link>
          <Link
            aria-disabled={questionnaireStatus && bookingStatus}
            href={
              questionnaireStatus && bookingStatus ? "/reservation/client" : "#"
            }
          >
            <div className={"border-2 border-white px-2 py-2 mx-10 my-1 "}>
              <h2>Enter Your Personal Information</h2>
              <p>Complete this to enter your personal information</p>
              <p className={"text-right"}>Prerequistes: Complete Booking</p>
            </div>
          </Link>
          <Link
            aria-disabled={questionnaireStatus && bookingStatus && clientStatus}
            href={
              questionnaireStatus && bookingStatus && clientStatus
                ? "/reservation/reminders"
                : "#"
            }
          >
            <div className={"border-2 border-white px-2 py-2 mx-10 my-1 "}>
              <h2>View Reminders</h2>
              <p>Complete this to view reminders before your appointment</p>
              <p className={"text-right"}>
                Prerequistes: Complete Personal Information
              </p>
            </div>
          </Link>

          {/* hold the reservation details */}
          <h3 className={"text-center text-xl"}>Reservation details</h3>
          <div
            className={
              "border-4 border-slate-400 mx-10 my-5 px-2 py-4 flex flex-row justify-center gap-x-1"
            }
          >
            <div
              className={
                "flex-auto flex-col border-2 border-r-white px-5 py-3 content-center "
              }
            >
              <p>Location: {reservation.reservation_location}</p>
              <p>Date: {reservation.reservation_date}</p>
              <p>Time: {reservation.reservation_time}</p>
              <p>Type: {reservation.reservation_type}</p>
              <p>Duration: {reservation.reservation_duration}</p>
            </div>
            <div
              className={
                "flex-auto flex-col border-2 border-r-white px-5 py-3 content-center"
              }
            >
              <p>
                Name: {reservation.reservation_given_name}{" "}
                {reservation.reservation_surname}
              </p>
              <p>Phone Number: {reservation.reservation_phone_number}</p>
              <p>Zipcode: {reservation.reservation_zipcode}</p>
            </div>
          </div>
          {questionnaireStatus &&
            bookingStatus &&
            clientStatus &&
            reminderStatus && (
              <Link href={"/summary"}>
                <button
                  className={
                    "bg-black text-sky-600 block text-center max-w-48 mx-auto my-5 px-4 py-2 border-2 border-blue-400 rounded-md hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
                  }
                  onClick={handleBooking}
                >
                  Book
                </button>
              </Link>
            )}
        </div>
      </div>
    </>
  );
};

export default Reservation;

// reservation_location: null,
// reservation_date: null,
// reservation_time: null,
// reservation_type: null,
// reservation_duration: null,
// reservation_status: "incomplete"
