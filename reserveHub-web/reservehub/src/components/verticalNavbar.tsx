"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "@/lib/features/global/globalSlice";
import { useSession, signOut } from "next-auth/react";

const VerticalNavbar = ({ name }: any) => {
  const isLoggedIn = true
  
  const dispatch = useDispatch();
  // const isloggedIn = useSelector((state: any) => state.global.isloggedIn);
  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    
  };
  return (
    <>
      <div className="h-screen w-64 bg-gray-200 p-4">
        <Link href={"/"}>
          <div
            className={
              "border-2 border-black rounded-md px-4 py-2  my-4 max-w-48 text-black"
            }
          >
            <h3>Home &lt;--</h3>
          </div>
        </Link>
      {isLoggedIn && <h2 className="text-xl font-semibold text-black">Hi {name}!</h2>}
      <div className="mb-8 mt-4">
        <p className="text-gray-600">Welcome to your dashboard</p>

        <div>
          <div className="mb-4">
            <ul className="space-y-4">
              <Link href={"/reservation"}>
                <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
                  Book Appointment
                </li>
              </Link>
              <Link href={"/viewreservation"}>
                <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
                  View Reservations
                </li>
              </Link>
            </ul>
          </div>
        </div>
        {isLoggedIn && (
          <>
            <div>
              <ul className="mb-4 space-y-4">
                <Link href={"/locations"}>
                  <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
                    Locations
                  </li>
                </Link>
                <Link href={"/appointments"}>
                  <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
                    Appointments
                  </li>
                </Link>
                <Link href={"/reservations"}>
                  <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
                    Reservations
                  </li>
                </Link>
              </ul>
            </div>

            <div>
              <ul className="space-y-4">
                <Link href={"/profile"}>
                  <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
                    Profile
                  </li>
                </Link>
                <Link href={"/dashboard/settings"}>
                  <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
                    Settings
                  </li>
                </Link>
              </ul>
            </div>
          </>
        )}
        {isLoggedIn ? (
          <button
          onClick={handleLogout}
            className="mt-8 block text-blue-500 cursor-pointer"
          >
            Log out
          </button>
        ) : (
          <Link href={"/dashboard"}>
            <span className="mt-8 block text-blue-500 cursor-pointer">
              Log in
            </span>
          </Link>
        )}
      </div>
        </div>
    </>
  );
};

export default VerticalNavbar;
