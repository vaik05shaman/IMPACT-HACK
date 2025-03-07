import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-sm">
      <Image src="/next.svg" width={100} height={50} alt="Next.js Logo" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
}

export default Header;
