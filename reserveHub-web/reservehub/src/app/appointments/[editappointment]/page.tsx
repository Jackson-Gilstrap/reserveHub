"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ConfirmationDelete from "@/components/confirmDelete";


const EditAppointment = () => {
  //get appointments
  const [app_title, setTitle] = useState("");
  const [app_date, setDate] = useState("");
  const [app_time, setTime] = useState("");
  const [app_location, setLocation] = useState("");
  const [app_type, setType] = useState("");
  const [app_status, setStatus] = useState("");
  const [cur_slots, setCurSlots] = useState("");
  const [max_slots, setMaxSlots] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter()

  const searchParams = useSearchParams();
  const app_id: string = searchParams.get("app_id") ?? "";
  const get_appointment = () => {
    fetch(`http://localhost:5000/api/app_retrival/${app_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
        const {
          app_date,
          app_time,
          app_type,
          app_title,
          app_location,
          app_status,
          cur_slots,
          max_slots,
        } = data.body;
        setDate(app_date);
        setTime(app_time);
        setLocation(app_location);
        setType(app_type);
        setStatus(app_status);
        setTitle(app_title);
        setCurSlots(cur_slots);
        setMaxSlots(max_slots);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const edit_appointment = async (e: any) => {
    e.preventDefault();
    const app_data = {
      app_id,
      app_date,
      app_time,
      app_type,
      app_title,
      app_location,
      app_status,
      cur_slots,
      max_slots,
    };
    console.log(app_data);
    const app_data_json = JSON.stringify(app_data);
    console.log(app_data_json);

    await fetch(`http://localhost:5000/api/app-edit/${app_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: app_data_json,
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

      setTimeout(() => {
        router.push("/appointments")
      }, 1500);
  };

  const handle_delete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    //delete logic here
    await fetch(`http://localhost:5000/api/app-delete/${app_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
    }).then(response => {
        if(!response.ok) {
            throw new Error("Network request unsuccessful")
        }
        return response.json()
    }).then(data=> {
        console.log("data: ", data)
    }).catch(error => {
        console.error(error)
    })
    console.log("appointment deleted");
    setShowModal(false);
    router.push("/appointments")
  };
  useEffect(() => {
    get_appointment();
  }, [app_id]);
  return (
    <>
      <Link href={"/appointments"} className="block">
        <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">
          Back
        </button>
      </Link>
      <h1 className="text-center">Edit Appointment</h1>
      <form
        action={"/appointments"}
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
            value={app_id}
            disabled
            className="border rounded-md text-white"
          />
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="title" className="px-1 py-2 mr-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={app_title}
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
            value={app_date}
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
            value={app_time}
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
            value={app_type}
            required
          >
            <option value="null">Select One</option>
            <option value="tax service">Tax Service </option>
            <option value="collect return">Collect Return</option>
          </select>
        </div>
        <div className="px-1 py-2 mb-2 ">
          <label htmlFor="location" className="px-1 py-2 mr-2">
            Location
          </label>
          <select
            className="text-black border rounded-md"
            value={app_location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="null">Select One</option>
            <option value="hartwick-college">Hartwick College</option>
            <option value="huntington-memorial">Huntington Memorial</option>
          </select>
        </div>
        <div className="px-1 py-2 mb-2">
          <label htmlFor="cur_slots" className="px-1 py-2 mr-2">
            Current slots
          </label>
          <input
            type="number"
            name="cur_slots"
            id="cur_slots"
            min={0}
            max={12}
            value={cur_slots}
            className="text-black border rounded-md"
            onChange={(e) => setCurSlots(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2">
          <label htmlFor="max_slots" className="px-1 py-2 mr-2">
            Max slots
          </label>
          <input
            type="number"
            name="max_slots"
            id="max_slots"
            min={1}
            max={12}
            value={max_slots}
            className="text-black border rounded-md"
            onChange={(e) => setMaxSlots(e.target.value)}
            required
          />
        </div>
        <div className="px-1 py-2 mb-2">
          <label htmlFor="status" className="px-1 py-2 mr-2">
            Status
          </label>
          <input
            type="text"
            name="status"
            id="status"
            value={app_status}
            className="text-black border rounded-md"
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div className="text-center mb-3">
          <button
            type="submit"
            onClick={edit_appointment}
            className=" border-2 border-lime-400 bg-lime-600 px-3 py-1 mb-4 rounded-sm mx-auto hover:bg-lime-500"
          >
            Confirm
          </button>
        </div>
        <div className="text-center mb-3">
          <button
            type="button"
            onClick={handle_delete}
            className=" border-2 border-lime-400 bg-lime-600 px-3 py-1 mb-4 rounded-sm mx-auto hover:bg-lime-500"
          >
            Delete
          </button>
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

export default EditAppointment;
