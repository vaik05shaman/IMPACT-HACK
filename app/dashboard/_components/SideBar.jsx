"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { HiOutlineHome } from "react-icons/hi2";
import { IoExtensionPuzzle, IoMenu, IoClose } from "react-icons/io5";
import { ArrowUpRightFromSquare } from "lucide-react";
import { IoLogOut } from "react-icons/io5";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const path = usePathname();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  

  const Menu = [
    { id: 1, name: "Home", icon: <HiOutlineHome />, path: "/dashboard" },
    { id: 2, name: "Explore", icon: <IoExtensionPuzzle />, path: "/dashboard/explore" },
    { id: 3, name: "Upgrade", icon: <ArrowUpRightFromSquare />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <IoLogOut />, path: "/dashboard/logout" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-blue-500 p-2 rounded-lg"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-[4.5rem] left-0 bg-white shadow-lg z-40 transition-all duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isCollapsed ? "w-16" : "w-64"} h-[calc(100vh-4.5rem)]`}
      >
        <div className="flex flex-col h-full p-3">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              width={isCollapsed ? 28 : 40}
              height={isCollapsed ? 18 : 24}
              alt="AI Education Logo"
              className="animate-fade-in"
            />
          </div>

          {/* Toggle Button (Desktop) */}
          <div className="hidden md:flex justify-end mb-4">
            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={toggleSidebar}
            >
              {isCollapsed ? <IoMenu size={24} /> : <IoClose size={24} />}
            </button>
          </div>

          <hr className="my-3" />

          {/* Menu Items */}
          <ul className="flex-1">
            {Menu.map((item) => (
              <Link key={item.id} href={item.path}>
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                    item.path === path
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 hover:text-black"
                  } ${isCollapsed ? "justify-center mx-auto" : ""}`}
                >
                  <div className="text-3xl">{item.icon}</div>
                  {!isCollapsed && <h2 className="text-sm font-medium">{item.name}</h2>}
                </div>
              </Link>
            ))}
          </ul>

          {/* User Profile */}
          <div className="mt-3 border-t pt-3 animate-fade-in delay-100">
            {user && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  isCollapsed ? "justify-center mx-auto" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm hover:scale-110 transition-transform">
                  {user?.firstName?.[0]?.toUpperCase() || "U"}
                </div>
                {!isCollapsed && (
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {user?.firstName || "User"}
                    </p>
                    <p className="text-xs text-gray-600">Learner</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <p className={`text-xs font-medium text-gray-600 mb-1 ${isCollapsed ? "text-center" : ""}`}>
              {isCollapsed ? "33%" : "Course Progress: 33%"}
            </p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: "33%" }}></div>
            </div>
            {!isCollapsed && (
              <>
                <p className="text-xs text-gray-500 mt-1">3 out of 5 courses created</p>
                <button
                  onClick={() => router.push("/create-course")}
                  className="mt-2 w-full bg-blue-500 text-white text-sm py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create More
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </>
  );
};

export default SideBar;