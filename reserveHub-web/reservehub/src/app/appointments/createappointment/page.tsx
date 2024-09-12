"use client";
// this forms edge cases are questionable will need to look into it more MVP functionality works post to backend
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateAppointment = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [maxSlots, setMaxSlots] = useState("");
  const [successMsg, setSuccessMsg] = useState("")
  const [clearMsg,setClearMsg] = useState("Form Has been Cleared")

  const router = useRouter()

 const clearInputs = () =>  {
    setTitle("");
    setDate("");
    setTime("");
    setType("");
    setLocation("");
    setMaxSlots("");
 }
  const handleCreate =  async (e: any) => {
    e.preventDefault();
    const app_data = {title,date,time,type,location,maxSlots}
    const app_data_json = JSON.stringify(app_data)

    await fetch("http://localhost:5000/api/app-create", {
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        body: app_data_json
    }).then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
    }).then(({data, message}) => {
        console.log(data);
        setSuccessMsg(message)
        console.log(successMsg)
      }).catch((error) => {
        console.error("Fetch error ", error.message);
      });

    console.log(app_data_json);
    setTimeout(() => {
      router.push("/appointments")
    }, 1500);
  };
  return (
    <>
      <Link href={"/appointments"} className="block">
        <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">
          Back
        </button>
      </Link>
      <h1 className="text-center">Create Appointment</h1>
      <form
        action={"/appointments"}
        method="POST"
        className=" mx-auto max-w-3xl border-slate-200 border rounded-md"
      >
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="title" className="px-1 py-2 mr-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            className="border rounded-md text-black"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="date" className="px-1 py-2 mr-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="border rounded-md text-black"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="time" className="px-1 py-2 space-x-8">
            Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            className="border rounded-md text-black"
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="type" className="px-1 py-2 mr-2">
            Type
          </label>
          <select
            className="text-black border rounded-md"
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="null">
              Select One
            </option>
            <option value="tax service">Tax Service </option>
            <option value="collect return">Collect Return</option>
          </select>
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="location" className="px-1 py-2 mr-2">
            Location
          </label>
          <select className="text-black border rounded-md" onChange={(e)=> setLocation(e.target.value)}
            required>
            <option value="null">
              Select One
            </option>
            <option value="Hartwick College">Hartwick College</option>
            <option value="Huntington Memorial">Huntington Memorial</option>
          </select>
        </div>
        <div className="px-1 py-2 mb-2">
          <label htmlFor="slots" className="px-1 py-2 mr-2">
            Max slots
          </label>
          <input
            type="number"
            name="slots"
            id="slots"
            min={1}
            max={12}
            className="text-black border rounded-md"
            onChange={(e)=> setMaxSlots(e.target.value)}
            required
          />
        </div>
        <div className="text-center mb-3">
          <button
            type="submit"
            onClick={handleCreate}
            className=" border-2 border-lime-400 bg-lime-600 px-3 py-1 mb-4 rounded-sm mx-auto hover:bg-lime-500"
          >
            Create
          </button>
          <button
            type="reset"
            onClick={clearInputs}
            className=" block border-2 border-lime-400 bg-lime-600 px-3 py-1 rounded-sm mx-auto hover:bg-lime-500"
          >
            Clear Form
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateAppointment;
