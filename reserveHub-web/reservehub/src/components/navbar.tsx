'use client';
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "@/lib/features/global/globalSlice";
import { useState } from "react";


const NavBar = ({isUserLoggedIn}: any) => {
    const dispatch = useDispatch();
    const handleLogout = () =>  {
        dispatch(setIsLoggedIn(false))
    }
    return (
        <div className="flex justify-between items-center px-4 py-2 border-b-4 border-slate-400">
            <h1 className="text-2xl ml-6">VITA</h1>
            <div className="mx-6">
                {isUserLoggedIn ? (
                    <Link href={'/'} onClick={handleLogout}><span className="text-black hover:text-blue-500">Log out</span></Link>
                ): (
                    <Link href={'/signup'}><span className="text-black hover:text-blue-500">Login</span></Link>
                )}
            </div>
        </div>
    )
}

export default NavBar;