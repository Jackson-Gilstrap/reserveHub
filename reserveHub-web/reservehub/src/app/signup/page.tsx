"use client";
//flow
//user comes in,
//enters first name and last name
//selects whether they are signing up with email or phone then inputs the respective one
//on back end we will check what type we are sending over email or phone once that is good
//then route them to the dashboard and check if the email they signed up with is a hartwick email will give extra permissions
import Link from "next/link";
import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState<String>("");
  const loginStatus: boolean = useSelector((state:any) => state.global.isloggedin);

  const handleSubmit =  async (event:any) => {
    
    const options = { email };
    console.log(email);

     await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(options),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        setSignupSuccess(true)
        return response.json();
    })
    .then(({data, message}) => {
        console.log(data);
        setSuccessMsg(message)
        console.log(successMsg)
      })
      .catch((error) => {
        console.error("Fetch error ", error.message);
      });
  };

 


  return (
    <div>
        <NavBar isloggedin={loginStatus}/>
        <Link href={"/"} className="block">
          <button>Go Home</button>
        </Link>
      <form  method='POST' action={'/dashboard'} onSubmit={handleSubmit}>
        <p>Lets begin with your email</p>

        <div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="text-black rounded-md"
          />
        </div>
        <button type="submit">Create Account</button>
        {signupSuccess && (
            <p>{successMsg}</p>
        )}
        <p>You can choose to skip and authenticate later</p>
        <Link href={"/dashboard"} className="block">
          <button>Skip</button>
        </Link>
      </form>
    </div>
  );
};
export default SignUp;
