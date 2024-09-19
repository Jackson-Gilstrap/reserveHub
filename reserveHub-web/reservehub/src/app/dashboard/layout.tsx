"use client";
import VerticalNavbar from "@/components/verticalNavbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function DashboardLayout({
  children, // will be a page or nested layout
}:any) {
  const alias = useSelector((state:any) => state.user);
  
  return (
    <section className="flex flex-row bg-slate-400">
      {/* Include shared UI here e.g. a header or sidebar */}
      <VerticalNavbar name={alias.userDetails.fname} />

      {children}
    </section>
  );
}
