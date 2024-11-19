"use client";
import Link from "next/link";
const Dashboard = () => {
  const name = 'Jackson';
  const loggedIn = true;
  const hasReservation = true;
  return (
    <>
      <div className="mx-6 mt-6 border-b-4 border-slate-400">
        <h2 className="text-4xl font-bold">Welcome {name}</h2>
      </div>
      <div className="flex flex-row justify-between items-center mx-6 py-6">
        <h2 className="text-xl">Upcoming Reservations</h2>
        <Link href={'/reservation'}>
            <span className="mr-6 border-2 border-black px-4 py-2 font-bold hover:bg-lime-300">&#43; New Reservation</span>
        </Link>
      </div>
      {loggedIn ? (
        <div>
            {hasReservation ? (
              <div className="flex flex-row justify-center items-center border-y-4  border-x-4 border-slate-400 mx-6 divide-x-2 divide-slate-500 h-36 w-19/20">
                <div className="flex flex-col basis-1/4 justify-evenly items-center py-1 px-2 h-full   ">
                  <span className="text-center my-1">Day of week</span>
                  <span className="text-center my-1">Date</span>
                  <span className="text-center my-1">Month</span>
                </div>


                <div className="flex flex-col basis-1/4 justify-evenly items-center py-1 h-full divide-y-2 divide-slate-400">
                  <span className="text-center w-full basis-1/2">Time</span>
                  
                  <span className="text-center w-full basis-1/2">Location</span>
                </div>


                <div className="flex flex-col basis-1/4 justify-evenly items-center py-1 h-full divide-y-2 divide-slate-400">
                  <span className="text-center w-full basis-1/2">Type</span>
      
                  <span className="text-center w-full basis-1/2">Booking Ref</span>
                </div>

                <div className="basis-1/4 h-full flex justify-center items-center">
                  <span className="text-center border-2 border-black px-4 py-2 hover:bg-lime-300">Edit</span>
                </div>
              </div>
            ): (
              <div className="flex flex-row justify-center items-center border-y-4  border-x-4 border-slate-400 mx-6 divide-x-2 divide-slate-500 h-36 w-19/20">
                <h3 className="text-center w-full basis-1/2">No reservation found</h3>
                <p className="text-center w-full basis-1/2">Please schedule a appointment to see your upcoming reservation</p>
              </div>
            )}

        </div>
      ):(
        <div className="flex flex-row justify-center items-center border-y-4  border-x-4 border-slate-400 mx-6 divide-x-2 divide-slate-500 h-36 w-19/20">
          <p className="text-center w-full">Please Login to see upcoming reservation</p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
