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
        <div className="flex justify-between items-center px-4 py-2">
            <h1 className="text-xl">Hartwick VITA/TCE</h1>
            <div className="ml-6">
                {isUserLoggedIn ? (
                    <Link href={'/'} onClick={handleLogout}><span className="text-blue-500">Log out</span></Link>
                ): (
                    <Link href={'/signup'}><span className="text-blue-500">Login</span></Link>
                )}
            </div>
        </div>
    )
}

export default NavBar;