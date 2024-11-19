"use client";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signIn } from "next-auth/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState<String>("");
  const loginStatus: boolean = useSelector(
    (state: any) => state.global.isloggedin
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res =  await signIn("credentials", {
      redirect:true,
      email: email,
      password: "password",
      callbackUrl: "/dashboard"
    })

    
  };

  return (
    <div>
      <Link href={"/"}>
        <div
          className={
            "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
          }
        >
          <h3>Home &lt;--</h3>
        </div>
      </Link>
      <div className="flex justify-center items-start h-screen p-8">
        {/* Left module: Login form */}
        <div className="w-full md:w-1/2 min-h-[300px] p-6 bg-white shadow-lg rounded-lg flex flex-col justify-center">
          <form method="POST" action={"/dashboard"} onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4 text-black">
              Employee/Volunteer Login
            </h2>
            <p className="mb-2 text-black">Let's begin with your email</p>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Login
            </button>

            {signupSuccess && (
              <p className="text-green-500 mt-4">{successMsg}</p>
            )}
          </form>
        </div>

        {/* Right module: Skip button */}
        <div className="w-full md:w-1/2 min-h-[300px] p-6 bg-white shadow-lg rounded-lg ml-8 flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold mb-4 text-black">For Clients</h2>
          <p className="mb-4 text-black">Skip, click below:</p>
          <Link href={"/dashboard"} className="block">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md">
              Skip
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
