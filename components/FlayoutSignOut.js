import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

const FlayoutSignOut = ({ open, setMenu }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [ismenuOpen, setIsmenuOpen] = useState(false);
  const [user, setUser] = useState("")
  const router = useRouter();

  const handleToggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  useEffect(() => {
    if (open !== "SignOut") {
      setIsSubmenuOpen(false);
    }
  }, [open]);
useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("UserInfo"))?.Fname +
    " " +
    JSON.parse(localStorage.getItem("UserInfo"))?.Lname)
}, [])

  return (
    <div className="relative inline-block text-left ">
      <div>
        <button
          type="button"
          onClick={() => {
            if (open === "SignOut") {
              return setMenu("");
            }
            setMenu("SignOut");
            setIsmenuOpen(true);
          }}
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-sm text-sm font-medium flex justify-center items-center"
        >
          {user}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <Transition
        show={open === "SignOut" && ismenuOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute z-10 mt-2 w-20 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => {
                localStorage.removeItem("UserToken");

                localStorage.removeItem("UserInfo");
                router.push("/Login");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default FlayoutSignOut;
