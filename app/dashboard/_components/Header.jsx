import React from 'react'
import Image from "next/image";
const Header = () => {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>

       <Image src="/next.svg" width={30} height={50} alt="Next.js Logo" />
    </div>
  )
}

export default Header