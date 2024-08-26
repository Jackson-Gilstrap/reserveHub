"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmationDelete from "@/components/confirmDelete";

const EditLocation = () => {
  const router = useRouter();
  const [loc_title, setTitle] = useState("");
  const [loc_street_address, setAddress] = useState("");
  const [loc_city, setCity] = useState("");
  const [loc_state, setState] = useState("");
  const [loc_zipcode, setZipcode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const searchParams = useSearchParams();
  const loc_id: string = searchParams.get("location_id") ?? "";

  const get_location = async () => {
    await fetch(`http://localhost:5000/api/loc-retrival/${loc_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
        const {
          location_name,
          location_street_address,
          location_city,
          location_state,
          location_zipcode,
        } = data.body;
        setTitle(location_name);
        setAddress(location_street_address);
        setCity(location_city);
        setState(location_state);
        setZipcode(location_zipcode);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const edit_location = async (e: any) => {
    e.preventDefault();
    const loc_data = {
      loc_title,
      loc_street_address,
      loc_city,
      loc_state,
      loc_zipcode,
    };
    const loc_data_json = JSON.stringify(loc_data);
    console.log(loc_data_json);

    await fetch(`http://localhost:5000/api/loc-edit/${loc_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: loc_data_json,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
      router.push("/locations")
  };

  const handle_delete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    //delete logic here
    await fetch(`http://localhost:5000/api/loc-delete/${loc_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("location deleted");
    setShowModal(false);
    router.push("/locations");
  };

  useEffect(() => {
    get_location();
  }, [loc_id]);
  return (
    <>
      <Link href={"/locations"} className="block">
        <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">
          Back
        </button>
      </Link>
      <h1 className="text-center">Edit Location</h1>
      <form
        action="/locations"
        method="POST"
        className=" mx-auto max-w-3xl border-slate-200 border rounded-md"
      >
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="id" className="px-1 py-2 mr-2">
            Id
          </label>
          <input
            type="text"
            name="id"
            id="id"
            value={loc_id}
            disabled
            className="border rounded-md text-white"
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="name" className="px-1 py-2 mr-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={loc_title}
            placeholder="Enter Name"
            className="border rounded-md text-black"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="street_address" className="px-1 py-2 mr-2">
            Street Address
          </label>
          <input
            type="text"
            name="street_address"
            id="street_address"
            value={loc_street_address}
            placeholder="Enter street address"
            className="border rounded-md text-black"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="city" className="px-1 py-2 mr-2">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={loc_city}
            placeholder="Enter City"
            className="border rounded-md text-black"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="state" className="px-1 py-2 mr-2">
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            value={loc_state}
            placeholder="Enter state"
            className="border rounded-md text-black"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="zipcode" className="px-1 py-2 mr-2">
            Zipcode
          </label>
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            value={loc_zipcode}
            placeholder="Enter Zipcode"
            className="border rounded-md text-black"
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>
        <div className="text-center mb-3">
          <button
            type="submit"
            onClick={edit_location}
            className=" border-2 border-lime-400 bg-lime-600 px-3 py-1 mb-4 rounded-sm mx-auto hover:bg-lime-500"
          >
            Confirm
          </button>
          <div className="text-center mb-3">
            <button
              type="button"
              onClick={handle_delete}
              className=" border-2 border-lime-400 bg-lime-600 px-3 py-1 mb-4 rounded-sm mx-auto hover:bg-lime-500"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
      <ConfirmationDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default EditLocation;