"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setClientDetailsStatus } from "@/lib/features/global/globalSlice";
import {
  setGivenName,
  setSurname,
  setPhoneNumber,
  setZipcode,
} from "@/lib/features/reservation/reservationSlice";

const ClientPage = () => {
  const [given_name, setGivenNameLocal] = useState("");
  const [surname, setSurnameLocal] = useState("");
  const [phone_number, setPhoneNumberLocal] = useState("");
  const [zipcode, setZipcodeLocal] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isClientDetails, setIsClientDetails] = useState(false);
  const dispatch = useDispatch();

  const phonenum_exp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const zipcode_exp = /^\d{5}(?:[-\s]\d{4})?$/;

  interface ValidationErrors {
    given_name?: string,
    surname?: string,
    phone_number?: string,
    zipcode?:string,
  }


  const handleSubmit = (e:any) => {
    e.preventDefault();
    setErrors({});
    const validationErrors: ValidationErrors = {};

    if (given_name.length < 2) {
      validationErrors.given_name = "Invalid given name is too short";
    } else if (given_name.length > 50) {
      validationErrors.given_name = "Invalid given name is too long";
    }

    if (surname.length < 2) {
      validationErrors.surname = "Invalid surname is too short";
    } else if (surname.length > 50) {
      validationErrors.surname = "Invalud surname is too long";
    }

    if (!phonenum_exp.test(phone_number)) {
      validationErrors.phone_number = "Invalid phone number format";
    }
    if (!zipcode_exp.test(zipcode)) {
      validationErrors.zipcode = "Invalid ZIP code format";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert(
        `Given Name: ${given_name}\nSurname: ${surname}\nPhone Number: ${phone_number}\nZipcode: ${zipcode}`
      );
      dispatch(setGivenName(given_name));
      dispatch(setSurname(surname));
      dispatch(setPhoneNumber(phone_number));
      dispatch(setZipcode(zipcode));
      setIsClientDetails(true);
    }
  };

  const handleSuccessfulClientInfo = () => {
    console.log("successful client entered!")
    dispatch(setClientDetailsStatus(true))
  }
  return (
    <>
    <Link href={"/"}>
        <div
          className={
            "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
          }
        >
          <h3>Return Home &lt;--</h3>
        </div>
      </Link>
      <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Client Info Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="given-name" className="block text-sm font-medium text-grey-700">Given Name: </label>
        <input
          type="text"
          onChange={(e) => setGivenNameLocal(e.target.value)}
          id="given_name"
          name="given-name"
          placeholder="Ex: John"
          required
          minLength={2}
          maxLength={50}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none"
        />
        {errors.given_name && <p>{errors.given_name}</p>}
        <br />
        <label htmlFor="surname" className="block text-sm font-medium text-grey-700">Surname: </label>
        <input
          type="text"
          onChange={(e) => setSurnameLocal(e.target.value)}
          id="surname"
          name="surname"
          placeholder="Ex: Doe"
          required
          minLength={2}
          maxLength={50}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black  focus:outline-none"
        />
        {errors.surname && <p>{errors.surname}</p>}
        <br />
        <label htmlFor="phone-number" className="block text-sm font-medium text-grey-700">Phone Number: </label>
        <input
          type="text"
          onChange={(e) => setPhoneNumberLocal(e.target.value)}
          name="phone-number"
          id="phone-number"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none"
        />
        {errors.phone_number && <p>{errors.phone_number}</p>}
        <br />
        <label htmlFor="zipcode" className="block text-sm font-medium text-grey-700">Zipcode: </label>
        <input
          type="text"
          onChange={(e) => setZipcodeLocal(e.target.value)}
          name="zipcode"
          id="zipcode"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none"
        />
        {errors.zipcode && <p>{errors.zipcode}</p>}
        <br />

        <button type="submit" className="bg-black text-sky-600 block text-center max-w-48   my-2 px-1 py-.5 border-2 border-blue-400 rounded-lg hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer">Save</button>
      </form>
      {isClientDetails && (
        <Link href={"/reservation"}>
          <button
            disabled={!isClientDetails}
            onClick={handleSuccessfulClientInfo}
            className={
              "bg-black text-sky-600 block text-center max-w-48 mx-20 my-5 px-4 py-2 border-2 border-blue-400 rounded-md hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
            }
          >
            Proceed
          </button>
        </Link>
      )}
    </div>
    </>
    
  );
};

export default ClientPage;
