"use client";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { useSelector } from "react-redux";
export default function Home() {
  const loginStatus: boolean = useSelector((state:any) => state.global.isloggedin);
  const employee_info = useSelector((state:any) => state.user);
  // console.log(employee_info);

  return (
    <div>
      <NavBar isUserLoggedIn={loginStatus} />
      <h1 className="block text-center my-4">
        Hartwick VITA/TCE
        <br />
        Reservation Portal
      </h1>
      {loginStatus && (
        <p className="text-center text-2xl my-4">
          Welcome Jackson
        </p>
      )}
      {loginStatus ? (
        <Link href={"/dashboard"}>
          <span className="bg-white text-sky-600 block text-center max-w-48 mx-auto py-2 rounded-full hover:bg-black hover:text-sky-400 hover:cursor-pointer">
            {" "}
            Volunteers Start Here
          </span>
        </Link>
      ) : (
        <Link href={"/reservation"}>
          <span className="bg-white text-sky-600 block text-center max-w-48 mx-auto py-2 rounded-full hover:bg-black hover:text-sky-400 hover:cursor-pointer">
            Clients Start Here
          </span>
        </Link>
      )}
    </div>
  );
}
