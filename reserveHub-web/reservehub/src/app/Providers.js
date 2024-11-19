'use client'

import {SessionProvider} from "next-auth/react";
import { Provider } from "react-redux";
import {makeStore} from '../lib/store'

export function Providers({children}) {
    return (

    <SessionProvider>
        <Provider store={makeStore}>{children}</Provider>
    </SessionProvider>

    ) 
}