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
    <>
    
    <div>
      {/* <NavBar isUserLoggedIn={loginStatus} /> */}
      <h1 className="text-center text-6xl mt-8">
        Volunteer
        <br />
        Income & Tax
        <br/>
        Assistance
        <br/>
        <span>&#40;VITA&#41;</span>
      </h1>
      <h2 className="text-center text-2xl mt-4">
        Begin Your Reservation Proccess Below
      </h2>
      <Link href={"/dashboard"}>
        <span className="bg-slate-500 text-sky-600 block text-center max-w-48 mt-6 mx-auto py-2 rounded-full hover:bg-black hover:text-sky-400 hover:cursor-pointer">
          Start
        </span>
      </Link>
    </div>
    <footer className="text-center text-slate-200">Hartwick College Volunteer Income Tax Services</footer>
    </>
  );
}
