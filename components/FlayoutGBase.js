import React, { Fragment, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const FlayoutGBase = ({ open, setMenu, pathname, title }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState("");
  const [ismenuOpen, setIsmenuOpen] = useState(false);

  const handleToggleSubmenu = (menu) => {
    setIsSubmenuOpen(menu);
  };

  useEffect(() => {
    if (open !== "Gbase") {
      setIsSubmenuOpen("");
    }
  }, [open]);
  const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Clicked outside the div
        setIsmenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={divRef}>
      <div>
        <button
          type="button"
          onClick={() => {
            if (open === "Gbase") {
              return setMenu("");
            }
            setMenu("Gbase");
            setIsmenuOpen(true);
          }}
          className={`text-gray-300 ${
            pathname.includes("gBase")
              ? "border-b-4 border-red-700"
              : "hover:bg-gray-700 hover:text-white "
          } px-2 py-1 rounded-sm text-sm font-medium flex justify-center items-center`}
          onBlur={() => (isSubmenuOpen !== "" ? setIsmenuOpen(false) : "")}
        >
          G.Base
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <Transition
        show={open === "Gbase" && ismenuOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute z-10 mt-2 w-48 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="relative">
            
              <Link
                href="/gBase/produit"
                className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Produit
              </Link>
              <Link
                href="/gBase/gamme"
                className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Gamme
              </Link>
            </div>
         
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default FlayoutGBase;
