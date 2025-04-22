"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineHome } from "react-icons/hi2";
import { IoExtensionPuzzle } from "react-icons/io5";
import { ArrowUpRightFromSquare } from "lucide-react";
import { IoLogOut } from "react-icons/io5";

const SideBar = () => {
  const path = usePathname();

  const Menu = [
    { id: 1, name: "Home", icon: <HiOutlineHome />, path: "/dashboard" },
    { id: 2, name: "Explore", icon: <IoExtensionPuzzle/>, path: "/dashboard/explore" },
    { id: 3, name: "Upgrade", icon: <ArrowUpRightFromSquare />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <IoLogOut />, path: "/dashboard/logout" },
  ];

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md flex flex-col justify-between">
      {/* Logo */}
      <div>
        <Image src="/logo.png" width={50} height={30} alt="Next.js Logo" />
        <hr className="my-5" />
        <ul>
          {Menu.map((item) => (
            <Link key={item.id} href={item.path}>
              <div
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                  item.path === path ? "bg-gray-100 text-black" : "hover:bg-gray-100 hover:text-black"
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          ))}
        </ul>
      </div>

      {/* Progress Bar */}
      {/* <div className="relative p-20">
        <p className="text-sm font-medium text-gray-600 mb-1">Progress: 33%</p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: "33%" }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">3 out of 5 courses created</p>
      </div> */}
    </div>
  );
};

export default SideBar;
