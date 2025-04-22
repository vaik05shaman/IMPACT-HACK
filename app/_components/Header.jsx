import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-sm">
     <div className="flex items-center gap-2">
     <Image src="/logo.png" width={40} height={20} alt="Next.js Logo" />
     <h2 className="font-bold text-2xl">AI Education</h2>
     </div>
   

     <Link href="/dashboard">
      <Button className='p-4 cursor-pointer'>Get Started
      <UserButton/>
      </Button>
      </Link>
    </div>
  );
}

export default Header;
