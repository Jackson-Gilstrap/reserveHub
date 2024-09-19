"use client";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { useSelector } from "react-redux";
export default function Home() {
  const loginStatus: boolean = useSelector(
    (state: any) => state.global.isloggedin
  );
  const employee_info = useSelector((state: any) => state.user);
  // console.log(employee_info);

  return (
    <div>
      <NavBar isUserLoggedIn={loginStatus} />
      <h1 className="block text-center my-4">
        Hartwick VITA/TCE
        <br />
        Reservation Portal
      </h1>
      <Link href={"/signup"}>
        <span className="bg-white text-sky-600 block text-center max-w-48 mx-auto py-2 rounded-full hover:bg-black hover:text-sky-400 hover:cursor-pointer">
          Start here
        </span>
      </Link>
    </div>
  );
}
