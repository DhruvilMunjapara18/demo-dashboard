"use client";

import React, { useState } from "react";
import { Images } from "@/public/assets";
import Image from "next/image";
import { MenuItem } from "@/types/menuItem";

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const menuItems: MenuItem[] = [
    { icon: Images.dashboard, label: "Dashboard", active: false },
    { icon: Images.product, label: "Product", active: false, hasSubmenu: true },
    {
      icon: Images.customers,
      label: "Customers",
      active: true,
      hasSubmenu: true,
    },
    { icon: Images.income, label: "Income", active: false, hasSubmenu: true },
    { icon: Images.promote, label: "Promote", active: false, hasSubmenu: true },
    { icon: Images.help, label: "Help", active: false, hasSubmenu: true },
  ];

  return (
    <div
      className={`min-h-screen p-4 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20 px-0  flex justify-center items-center" : "w-64 "
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-2 p-6 cursor-pointer ${
          collapsed ? "justify-center" : ""
        }`}
        onClick={() => setCollapsed(!collapsed)}
      >
        <Image src={Images.logo} width={37} height={37} alt="logo" />
        {!collapsed && (
          <>
            <span className="text-lg font-semibold text-[#000000]">
              Dashboard
            </span>
            <span className="text-[10px] font-medium text-[#838383]">v.01</span>
          </>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-between p-2 mb-2 rounded-lg text-sm transition-colors ${
              item.active
                ? "bg-[#5932EA] text-[#ffffff]"
                : "text-[#9197B3] hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image src={item.icon} width={24} height={24} alt="icon" />
              {!collapsed && <span>{item.label}</span>}
            </div>
            {!collapsed && item.hasSubmenu && (
              <Image
                src={Images.right_arrow}
                width={20}
                height={20}
                alt="right_arrow"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Upgrade Card */}
      {!collapsed && (
        <div className="flex  flex-col items-center justify-center px-6 py-3 gap-3 bg-gradient-to-r mb-6 rounded-md from-[#EAABF0] to-[#4623E9]">
          <span className="text-[#ffffff] font-semibold  text-[14px] text-center">
            Upgrade to PRO to get access all Features!
          </span>
          <button className="bg-[#ffffff] text-[#4925E9] font-semibold text-[14px] px-10 py-2 rounded-full">
            Get Pro Now!
          </button>
        </div>
      )}

      {/* User Profile */}
      <div className="flex justify-between  items-center">
        <div className="flex  items-center gap-3">
          <Image src={Images.profile} width={42} height={42} alt="profile" />
          {!collapsed && (
            <div>
              <p className="text-[#000000] font-medium  text-[14px]">Evano</p>
              <p className="text-xs  text-[#757575]">Project Manager</p>
            </div>
          )}
          {!collapsed && (
            <Image
              src={Images.down_arrow}
              width={24}
              height={24}
              alt="down_arrow"
            />
          )}
        </div>
      </div>
    </div>
  );
};
