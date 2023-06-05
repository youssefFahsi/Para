import React, { Fragment, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const FlyoutMenu = ({ open, setMenu, pathname, title }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState("");
  const [ismenuOpen, setIsmenuOpen] = useState(false);

  const handleToggleSubmenu = (menu) => {
    setIsSubmenuOpen(menu);
  };

  useEffect(() => {
    if (open !== "Paiment") {
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
            if (open === "Paiment") {
              return setMenu("");
            }
            setMenu("Paiment");
            setIsmenuOpen(true);
          }}
          className={`text-gray-300 ${
            pathname.includes("paiment")
              ? "border-b-4 border-red-700"
              : "hover:bg-gray-700 hover:text-white "
          } px-2 py-1 rounded-sm text-sm font-medium flex justify-center items-center`}
          onBlur={() => (isSubmenuOpen !== "" ? setIsmenuOpen(false) : "")}
        >
          Paiment
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <Transition
        show={open === "Paiment" && ismenuOpen}
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
              <button
                type="button"
                className="w-full text-left flex justify-between items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleToggleSubmenu("ENC")}
              >
                Encaissements
                <ChevronRightIcon
                  className="-mr-1 ml-1 h-3 w-3"
                  aria-hidden="true"
                />
              </button>
              <Transition
                as={Fragment}
                show={isSubmenuOpen === "ENC" || false}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute z-10 mt-0 w-48 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-full top-0">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="horizontal"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      href="/paiment/enc/reception"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Reception
                    </Link>
                    <Link
                      href="/paiment/enc/validation"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Validation
                    </Link>
                    <Link
                      href="/paiment/enc/consultation"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Consultation
                    </Link>
                    <Link
                      href="/paiment/enc/transfert"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Transfert
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
            <div className="relative">
              <button
                type="button"
                className="w-full text-left flex justify-between items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleToggleSubmenu("DEC")}
              >
                Décaissements
                <ChevronRightIcon
                  className="-mr-1 ml-1 h-3 w-3"
                  aria-hidden="true"
                />
              </button>
              <Transition
                as={Fragment}
                show={isSubmenuOpen === "DEC" || false}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute z-10 mt-0 w-48 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-full top-0">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="horizontal"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      href="/paiment/dec/consultation"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Consultation
                    </Link>

                    <Link
                      href="/paiment/dec/carnets"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Carnets/talons
                    </Link>
                    <Link
                      href="/paiment/dec/type"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Type
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
            <div className="relative">
              <button
                type="button"
                className="w-full text-left flex justify-between items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleToggleSubmenu("AFF")}
              >
                Affectation
                <ChevronRightIcon
                  className="-mr-1 ml-1 h-3 w-3"
                  aria-hidden="true"
                />
              </button>
              <Transition
                as={Fragment}
                show={isSubmenuOpen === "AFF" || false}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute z-10 mt-0 w-48 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-full top-0">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="horizontal"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      href="/paiment/affectation/enc"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Encaissements
                    </Link>

                    <Link
                      href="/paiment/affectation/dec"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Decaissements
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
            <div className="relative">
              <button
                type="button"
                className="w-full text-left flex justify-between items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleToggleSubmenu("BANQUE")}
              >
                Banque
                <ChevronRightIcon
                  className="-mr-1 ml-1 h-3 w-3"
                  aria-hidden="true"
                />
              </button>
              <Transition
                as={Fragment}
                show={isSubmenuOpen === "BANQUE" || false}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute z-10 mt-0 w-48 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-full top-0">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="horizontal"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      href="/paiment/banque/aPayments"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      A/Paiments
                    </Link>

                    <Link
                      href="/paiment/banque/consultation"
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Consultation
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          <div className="relative">
            
              <Link
                href="/paiment/bordereau"
                className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Bordereau
              </Link>
            </div>
        </div>
      </Transition>
    </div>
  );
};

export default FlyoutMenu;
