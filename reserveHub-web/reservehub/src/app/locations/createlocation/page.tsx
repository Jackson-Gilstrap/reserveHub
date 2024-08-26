"use client";
// this forms edge cases are questionable will need to look into it more MVP functionality works post to backend
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateLocation = () => {
  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [successMsg, setSuccessMsg] = useState("")
  const [clearMsg,setClearMsg] = useState("Form Has been Cleared")
  const router = useRouter()

 const clearInputs = () =>  {
    setName("");
    setStreetAddress("");
    setCity("");
    setState("");
    setZipcode("");

 }
  const handleCreate =  async (e: any) => {
    e.preventDefault();
    const app_data = {name,streetAddress,city,state,zipcode}
    const app_data_json = JSON.stringify(app_data)

    await fetch("http://localhost:5000/api/loc-create", {
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
      router.push("/locations")

    console.log(app_data_json);
  };
  return (
    <>
      <Link href={"/appointments"} className="block">
        <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">
          Back
        </button>
      </Link>
      <h1 className="text-center">Create Location</h1>
      <form
        action={"/appointments"}
        method="POST"
        className=" mx-auto max-w-3xl border-slate-200 border rounded-md"
      >
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="name" className="px-1 py-2 mr-2">
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            className="border rounded-md text-black"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="street-address" className="px-1 py-2 mr-2">
            Street Address
          </label>
          <input
            type="street-address"
            name="street-address"
            id="street-address"
            className="border rounded-md text-black"
            onChange={(e) => setStreetAddress(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="city" className="px-1 py-2 space-x-8">
            City
          </label>
          <input
            type="city"
            name="city"
            id="city"
            className="border rounded-md text-black"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="state" className="px-1 py-2 mr-2">
            State
          </label>
          <select
            className="text-black border rounded-md"
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value="null">
              Select One
            </option>
            <option value="NY">NY</option>
          </select>
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="zipcode" className="px-1 py-2 space-x-8">
            Zipcode
          </label>
          <input
            type="zipcode"
            name="zipcode"
            id="zipcode"
            className="border rounded-md text-black"
            onChange={(e) => setZipcode(e.target.value)}
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

export default CreateLocation;
