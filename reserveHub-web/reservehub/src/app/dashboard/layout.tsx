"use client";
import VerticalNavbar from "@/components/verticalNavbar";
import NavBar from "@/components/navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function DashboardLayout({
  children, // will be a page or nested layout
}:any) {
  const alias = useSelector((state:any) => state.user);
  
  return (
    <>
    <NavBar isloggedin={false}></NavBar>
    {children}
    </>
  );
}
