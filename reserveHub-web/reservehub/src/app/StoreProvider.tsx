'use client'

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

export default function StoreProvider({children}:any) {
    const storeRef: any = useRef();
    if(!storeRef.current) {
        //creates store on first render.
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}