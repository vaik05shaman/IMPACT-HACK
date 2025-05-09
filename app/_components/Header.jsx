"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { isSignedIn, user, isLoaded } = useUser();


  return (
    <header className="bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
         <Link href="/">
        <div className="flex items-center gap-3 animate-fade-in-up cursor-pointer">
         
          <Image
            src="/logo.png"
            width={40}
            height={20}
            alt="AI Education Logo"
            className="object-contain"
          />
        
          <h2 className="font-extrabold text-2xl tracking-tight">AI Education</h2>
        </div>
        </Link>

        {/* Auth and Profile Section */}
        <div className="flex items-center gap-3 animate-fade-in-up delay-200">
          {isSignedIn ? (
            <>
              {/* Welcome Message */}
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-white">
                <span>Welcome, {user?.firstName || "User"}!</span>
                <span className="text-gray-200">Start creating courses today.</span>
              </div>

              {/* Profile Section */}
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <UserButton />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Pre-Sign-In Content */}
              <div className="hidden sm:block text-sm font-medium">
                New here?{" "}
                <Link href="/sign-up" className="underline hover:text-gray-200">
                  Create an account
                </Link>{" "}
                to start learning!
              </div>
              <Link href="/sign-in">
                <Button className="bg-white text-blue-600 hover:bg-gray-200 hover:text-blue-800 px-4 py-2 transition-colors">
                  Log In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-blue-600 text-white border border-white hover:bg-blue-700 px-4 py-2 transition-colors">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </header>
  );
}

export default Header;