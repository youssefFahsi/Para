import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { XMarkIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FixedSizeList } from "react-window";

export default function SelectAutoVis({ id,selected, data, setSelected,disabled,clear,height }) {
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? data
      : data?.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const handleFocus = (event) => event.target.select();

  return (
    <div  className="outline-none w-full ">
      <Combobox
    
        value={selected}
        onChange={(e) => {
          setSelected(e);
        }}
        disabled={disabled ? true : false}
      >
        <div className="relative">
          <div className=" border relative w-full text-xs  cursor-default overflow-hidden rounded-md bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none text-xs  py-1 pl-2 pr-5  leading-4 text-gray-900 focus:ring-0 outline-none"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={(e) => handleFocus(e)}
              id={id}
              name={id}
            />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
           {(selected && Object.keys(selected).length !== 0 && clear) && <button onClick ={()=>setSelected({})} className="absolute inset-y-0 right-3 flex items-center pr-2 mr-2">
            <XMarkIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button> } 
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options   className="absolute mt-1 z-[999] max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
              {filteredPeople?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                <FixedSizeList
                  height={height || 200} // Set the desired height of the list
                  itemCount={filteredPeople?.length}
                  itemSize={25} // Set the desired height of each item in the list
                  width="100%"
                >
                  {({ index, style }) => {
                    const person = filteredPeople[index];
                    return (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-1 pl-5 pr-2 text-xs  ${
                            active ? "bg-[#424242] text-white" : "text-gray-900"
                          }`
                        }
                        value={person}
                        style={style} // Pass the style prop to each option
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                          </>
                        )}
                      </Combobox.Option>
                    );
                  }}
                </FixedSizeList>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
