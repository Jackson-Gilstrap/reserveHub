
'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReminderStatus } from "@/lib/features/global/globalSlice";
import GeneralReminders from "@/components/generalreminders";
const RemindersPage = () => {
  const [is_checked, setIsChecked] = useState();
  const reservation = useSelector((state: any) => state.reservation);
  const dispatch = useDispatch();

  const handleReminderStatus = () => {
    dispatch(setReminderStatus(true));
  };

  const handleChange = (e: any) => {
    setIsChecked(e.target.checked);
    console.log(is_checked);
  };
  return (
    <>
    <Link href={"/reservation"}>
        <div
          className={
            "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
          }
        >
          <h3>Reservation wizard &lt;--</h3>
        </div>
      </Link>
      <GeneralReminders />
      <div>
        <input
          type="checkbox"
          name="confirm"
          id="confirm"
          onChange={handleChange}
        />
        <span>I have Acknowledge the reminders</span>
      </div>
      {is_checked && (
        <Link href={"/reservation"}>
          <button onClick={handleReminderStatus}>Proceed</button>
        </Link>
      )}
    </>
  );
};

export default RemindersPage;
