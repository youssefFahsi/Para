import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import FlayoutGBase from "./FlayoutGBase";


const Navbar = () => {
  const [menu, setMenu] = useState("");
  const { pathname } = useRouter();
  return (
    <nav className="bg-[#2a2929] shadow-md">
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 flex">
        <div className="flex items-center justify-start py-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-sm">Para</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                onClick={() => setMenu("")}
                className={`text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-sm text-sm font-medium ${
                  pathname === "/"
                    ? "border-b-4 border-red-700"
                    : "hover:bg-gray-700 hover:text-white "
                }`}
              >
                Home
              </Link>
             
              <FlayoutGBase
                setMenu={(e) => setMenu(e)}
                open={menu}
                pathname={pathname}
              />
            
              
            </div>
          </div>
        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
