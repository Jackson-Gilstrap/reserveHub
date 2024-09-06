
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
