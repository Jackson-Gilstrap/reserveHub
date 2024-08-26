"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
const Locations = () => {
  const [locations_array, setLocationArray] = useState([]);
  
  const get_locations = async () => {
    await fetch("http://localhost:5000/api/locs-retrival")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
        setLocationArray(data.body);
      }).catch(error=> {
        console.error(error)
      });
  };

  useEffect(()=> {
    get_locations();
  },[locations_array])
  return (
    <>
      <header>
        <h1 className="text-center py-3">Locations</h1>
      </header>
      <Link href={"/dashboard"} className="block">
        <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">
          Dashboard
        </button>
      </Link>
      <section className=" mx-auto my-3 px-6 py-3 border-2 border-slate-300">
        <div className="flex flex-row justify-between mb-4">
          <div>
            <h2>Locations</h2>
            <p>List of locations service is available</p>
          </div>
          <div className="self-center ">
            <Link href={"/locations/createlocation"} className="mr-10">
              <span className="border-2 border-lime-400 bg-lime-600 px-3 py-1 rounded-sm hover:bg-lime-500">
                +Create
              </span>
            </Link>
          </div>
        </div>

        <table className="border-collapse table-auto mx-auto my-2">
          <thead>
            <tr>
              <th className="border border-slate-600 text-left px-2">Name</th>
              <th className="border border-slate-600 text-left px-2">
                Street Address
              </th>
              <th className="border border-slate-600 text-left px-2">City</th>
              <th className="border border-slate-600 text-left px-2">State</th>
              <th className="border border-slate-600 text-left px-2">
                Zipcode
              </th>
              <th className="border border-slate-600 text-left px-2"></th>
            </tr>
          </thead>
          <tbody>
            {locations_array.map((location:any) => (
              <tr key={location.location_id}>
                <td className="border border-slate-600 text-center px-2">
                  {location.location_name}
                </td>
                <td className="border border-slate-600 text-center px-2">
                  {location.location_street_address}
                </td>
                <td className="border border-slate-600 text-center px-2">
                  {location.location_city}
                </td>
              <td className="border border-slate-600 text-center px-2">{location.location_state}</td>
                <td className="border border-slate-600 text-center px-2">
                  {location.location_zipcode}
                </td>
                <td className="border border-slate-600 text-center px-2">
                  <Link
                    href={{
                      pathname: `/locations/${location.location_id}`,
                      query: { location_id: JSON.stringify(location.location_id) },
                    }}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Locations;
