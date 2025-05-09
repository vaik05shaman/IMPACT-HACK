"use client";

import React from "react";
import Header from "../_components/Header";
import SideBar from "./_components/SideBar";
import Footer from "../../app/_components/Footer";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 pt-[4.5rem]">
        {/* Sidebar */}
        <SideBar />

        {/* Dashboard Content */}
        <main className="flex-1 ml-0 md:ml-16 lg:ml-64 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DashboardLayout;