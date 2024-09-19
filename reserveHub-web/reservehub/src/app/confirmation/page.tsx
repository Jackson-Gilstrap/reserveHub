"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearReservationDetails } from "@/lib/features/reservation/reservationSlice";

const ReservationConfirmation = () => {
  const {
    reservationGivenName,
    reservationSurname,
    reservationPhoneNumber,
    reservationZipcode,
  } = useSelector((state: any) => state.reservation);

  const router = useRouter();
  const dispatch = useDispatch();

  const [bookingRef, setBookingRef] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationLocation, setReservationLocation] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationType, setReservationType] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);

  const sendHome = () => {
    router.push("/");
  };

  const formatDate = (date: string) => {
    let tempArr = date.split("T");
    return tempArr[0];
  };

  const formatTime = (time: string) => {
    let tempArr = time.split(":");
    const hour: number = parseInt(tempArr[0]);
    const minute: string = tempArr[1];

    if (hour > 12) {
      const newHour: string = (hour - 12).toString();
      return `${newHour}:${minute} PM`;
    } else if (hour == 12) {
      return `${hour}:${minute} PM`;
    } else {
      return `${hour}:${minute} AM`;
    }
  };

  const handleSearchWithClientDetails = () => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/search-client-details/?lastname=${reservationSurname}&phonenumber=${reservationPhoneNumber}&zipcode=${reservationZipcode}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        const { booking_ref, res_date, res_location, res_time, res_type } =
          data.body[0];
        const newDate = formatDate(res_date);
        const newTime = formatTime(res_time);
        setBookingRef(booking_ref);
        setReservationDate(newDate);
        setReservationTime(newTime);
        setReservationLocation(res_location);
        setReservationType(res_type);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleSearchWithClientDetails();
  }, []);

  return (
    <>
      <Link href={"/dashboard"}>
        <div className="border-2 border-white rounded-md px-4 py-2 mx-10 my-4 max-w-48">
          <h3>Dashboard &lt;--</h3>
        </div>
      </Link>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading reservation details...
          </p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-black">
              Reservation Confirmation
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-black">
                  Guest Information
                </h3>
                <p className="text-gray-700">
                  {reservationGivenName} {reservationSurname}
                </p>
                <p className="text-gray-700">Phone: {reservationPhoneNumber}</p>
                <p className="text-gray-700">Zip Code: {reservationZipcode}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Reservation Details</h3>
                <p className="text-gray-700">Booking Reference: {bookingRef}</p>
                <p className="text-gray-700">Date: {reservationDate}</p>
                <p className="text-gray-700">Time: {reservationTime}</p>
                <p className="text-gray-700">Location: {reservationLocation}</p>
                <p className="text-gray-700">Type: {reservationType}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={sendHome}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
              >
                Return Home
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ReservationConfirmation;
