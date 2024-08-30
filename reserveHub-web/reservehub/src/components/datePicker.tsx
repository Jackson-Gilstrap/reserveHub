"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { setDate } from "@/lib/features/reservation/reservationSlice";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker = () => {
  const [dateValue, onChange] = useState<Value>(new Date());
  const dispatch = useDispatch();
  const formatDate = (date: Value) => {
    const dateArr = date?.toString().split(" ");
    const newDateStr = dateArr?.slice(0, 4).join(" ");
    return newDateStr;
  };

  useEffect(() => {
    formatDate(dateValue);
    dispatch(setDate(formatDate(dateValue)));
  }, [dateValue]);
  return (
    <>
      <div>
        <Calendar
          onChange={onChange}
          value={dateValue}
          view="month"
          defaultActiveStartDate={new Date()}
          minDate={new Date()}
          
        />
      </div>
    </>
  );
};

export default DatePicker;
