"use client";
import Link from "next/link";
const Dashboard = () => {
  return (
    <>
      <div className="grid gap-8 grid-cols-2  text-center mx-auto my-2">
        <div className=" max-h-48 text-black bg-gradient-to-br from-sky-500/75 to-sky-700 rounded-lg flex flex-col justify-center ">
          <p className="px-1 py-1 my-2 mx-2">Icon</p>
          <h3 className="my-0.5 mx-2">Book</h3>
          <p className="my-0.5 mx-2">Book your next reservation here</p>
          <Link href={"/reservation"}>
            <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">Click</button>
          </Link>
        </div>
        <div className=" max-h-48 text-black bg-gradient-to-br from-sky-500/75 to-sky-700 rounded-lg flex flex-col justify-center ">
          <p className="px-1 py-1 my-2 mx-2">Icon</p>
          <h3 className="my-0.5 mx-2">View</h3>
          <p className="my-0.5 mx-2">View your reservation here</p>
          <Link href={"#"}>
            <button className="px-3 py-1 my-2 mx-2 bg-white text-slate-700 rounded-md border-1 border-black hover:bg-slate-200">Click</button>
          </Link>
    
        </div>
      </div>
    </>
  );
};

export default Dashboard;
