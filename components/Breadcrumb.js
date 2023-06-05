import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const Breadcrumb = ({ items }) => {
  return (
    <div className="p-1">
    <nav
      className="text-gray-500 text-sm font-medium p-1 rounded shadow-md bg-[#E0E0E0] px-2"
    >
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && (
              <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            )}
            {item.url ? (
              <Link className="hover:text-indigo-600" href={item.url}>
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </div>
  );
};

export default Breadcrumb;
