"use client";

import Link from "next/link";

const Appointments = () => {
  return (
    <>
      <header>
        <h1 className="text-center py-3">Appointments</h1>
      </header>
      <Link href={"/dashboard"} className="block">
        <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">
          Dashboard
        </button>
      </Link>
      <section className=" mx-auto my-3 px-6 py-3 border-2 border-slate-300">
        <div className="flex flex-row justify-between mb-4">
          <div>
            <h2>Appointments</h2>
            <p>List of Appointments with Id, name, date, time, slots</p>
          </div>
          <div className="self-center ">
            <Link href={"/appointments/createappointment"} className="mr-10">
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
              <th className="border border-slate-600 text-left px-2">Date</th>
              <th className="border border-slate-600 text-left px-2">Time</th>
              <th className="border border-slate-600 text-left px-2">Slots</th>
              <th className="border border-slate-600 text-left px-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-600 text-center px-2">
                Hartwick
              </td>
              <td className="border border-slate-600 text-center px-2">
                08/13/24
              </td>
              <td className="border border-slate-600 text-center px-2">7:00</td>
              <td className="border border-slate-600 text-center px-2">5/6</td>
              <td className="border border-slate-600 text-center px-2">Edit</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Appointments;
