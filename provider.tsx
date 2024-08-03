'use client'
import * as React from "react"
import {usePathname} from "next/navigation"
import { SessionProvider } from "next-auth/react"
import Navbar from "./components/header/Navbar"

type Props = {
    children: React.ReactNode;
  };
  
  const Provider = ({ children }: Props) => {  
    const pathname = usePathname();
    const disableNavbar = ["login", "register", "dashboard", "user"];
   
    return (
      <SessionProvider>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
      </SessionProvider>
    );
  };
  
  export default Provider;