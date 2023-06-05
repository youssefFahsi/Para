import React, { useState } from "react";

import SelectAutoVis from "./SelectAutoVis";

const DynamicFilter = ({ headers, onFilter, show,size,filterSmall,filterRow }) => {
  const [filterValues, setFilterValues] = useState({});
  const [filterValuesSelect, setFilterValuesSelect] = useState({});

  const handleChange = (e, name) => {
    if (e.target.value.trim() === "") {

        const updatedState = { ...filterValues };
        delete updatedState[name];
  
        return setFilterValues(updatedState);
      }
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };
  const handleChangeSelect = (e, name) => {
   console.log(e)
   if(Object.keys(e).length === 0){
    const updatedState = { ...filterValues };
    delete updatedState[name];

    const updatedStateSelect = { ...filterValuesSelect };
    delete updatedStateSelect[name];

    setFilterValuesSelect(updatedStateSelect)

    return setFilterValues(updatedState);
   }
    setFilterValuesSelect({ ...filterValuesSelect, [name]: e });
    setFilterValues({ ...filterValues, [name]: e.id });
  };
  const handleChangeNumber = (e, name) => {
    if (e.target.value.trim() === "") {

        const updatedState = { ...filterValues };
        delete updatedState[name];
  
        return setFilterValues(updatedState);
      }
    setFilterValues({ ...filterValues, [name]: Number(e.target.value) });
  };

  const handleDateChange = (name, e) => {
    if (e.target.value.trim() === "") {

      const updatedState = { ...filterValues };
      delete updatedState[name];

      return setFilterValues(updatedState);
    }
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };

  const handleFilter = () => {
    console.log(filterValuesSelect);
    onFilter(filterValues);
  };

  const renderFilter = (header) => {
    const { name, type, label, options } = header;

    if (type === "number") {
      return (
        <div key={name} className="my-1 mx-1 ">
          <label className="mr-2 text-xs xxl:text-base">{label}:</label>
          <input
            className="px-2 py-1 border rounded-md  w-full text-xs xxl:text-base"
            type="number"
            value={filterValues[name] || ""}
            onChange={(e) => handleChangeNumber(e, name)}
          />
        </div>
      );
    }
    if (type === "string") {
      return (
        <div key={name} className="my-1 mx-1 ">
          <label className="mr-2 text-xs xxl:text-base ">{label}:</label>
          <input
            className="px-2 py-1 border rounded-md w-full text-xs xxl:text-base"
            type="text"
            value={filterValues[name] || ""}
            onChange={(e) => handleChange(e, name)}
          />
        </div>
      );
    }
    if (type === "date") {
      return (
        <div key={name} className="my-1 mx-1 ">
          <label className="mr-1 text-xs xxl:text-base">{label}:</label>
          <input
            className="px-2 py-1 border rounded-md w-full sm:w-full text-xs xxl:text-base"
            type="date"
            value={filterValues[name] || ""}
            onChange={(e) => handleDateChange(name, e)}
          />
        </div>
      );
    }
    if (type === "select") {
      return (
        <div key={name} className="my-1 mx-1 ">
          <label className="mr-2 text-xs xxl:text-base">{label}:</label>

          <SelectAutoVis
            data={options}
            setSelected={(e) => handleChangeSelect(e, name)}
            selected={filterValuesSelect[name] || ""}
            clear={true}
            id={name}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`py-1 px-1 border shadow bg-transparent ${
        show ? "" : "hidden"
      }`}
    >
      <div className={size}>
        {headers.map((header) => (
          <div
            key={header.name}
            className={`w-full ${header.size } `}
          >
            {renderFilter(header)}
          </div>
        ))}
        {filterSmall && <div className={filterRow}>
        <button
          className="px-2 py-1 bg-indigo-500 text-white rounded-md ml-2 text-xs xxl:text-base "
          onClick={()=>handleFilter()}
        >
          Filtrer
        </button>
        <button
          className="px-2 py-1 bg-yellow-500 text-white rounded-md ml-2 text-xs xxl:text-base"
          onClick={() => {
            setFilterValues({});
            setFilterValuesSelect({});
          
          }}
        >
          Clear
        </button>
          </div>}
      </div>
     {filterSmall === true ? "" :<div className="flex justify-end items-center border py-2 mt-3 gap-2 px-2 rounded">
        <button
          className="px-2 py-1 bg-indigo-500 text-white rounded-md ml-2 text-xs xxl:text-base "
          onClick={()=>handleFilter()}
        >
          Filtrer
        </button>
        <button
          className="px-2 py-1 bg-yellow-500 text-white rounded-md ml-2 text-xs xxl:text-base"
          onClick={() => {
            setFilterValues({});
            setFilterValuesSelect({});
          
          }}
        >
          Clear
        </button>
      </div>} 
    </div>
  );
};

export default DynamicFilter;
