import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import SummaryDiv from "./SumarryDiv";
import ExportToExcelButton from "./ExportToExcelButton";

const Table = ({
  data,
  headers,
  dataFooter,
  headerCompo,
  disabledFilter,
  itemsPerPageProps,
  defaultSort,
}) => {
  const [tableData, setTableData] = useState([]);
  const [sortColumn, setSortColumn] = useState(defaultSort?.key || "");
  const [sortOrder, setSortOrder] = useState(defaultSort?.mode || "asc");
  const [filterValues, setFilterValues] = useState({});
  const [filterState, setFilterState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageProps || 10);
  useEffect(() => {
    setTableData(data);
   // setCurrentPage(1)

    
  }, [data]);
  useEffect(() => {
    setCurrentPage(1)
  }, [data.length])
  

  const handleSort = (column) => {
    let newSortOrder = "asc";
    if (sortColumn === column && sortOrder === "asc") {
      newSortOrder = "desc";
    }

    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleFilter = (e, column) => {
    const { name, value } = e.target;
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [column]: {
        ...prevFilterValues[column],
        [name]: name === "operator" ? value : value,
      },
    }));
    setCurrentPage(1);
  };

  const filterData = (item) => {
    return Object.entries(filterValues).every(([column, value]) => {
      if (!value || !value.operator || !value.value) {
        return true; // Skip filtering if the value, operator, or column is not set
      }

      const header = headers.find((h) => h.key === column);
      const columnValue = item[column];

      if (header.type === "number") {
        if (value.operator === "=") {
          return columnValue === Number(value.value);
        } else if (value.operator === "<") {
          return columnValue < Number(value.value);
        } else if (value.operator === ">") {
          return columnValue > Number(value.value);
        }
      } else if (header.type === "string") {
        if (value.operator === "contains") {
          return columnValue
            .toString()
            .toLowerCase()
            .includes(value.value.toLowerCase());
        } else if (value.operator === "startsWith") {
          return columnValue
            .toString()
            .toLowerCase()
            .startsWith(value.value.toLowerCase());
        } else if (value.operator === "endsWith") {
          return columnValue
            .toString()
            .toLowerCase()
            .endsWith(value.value.toLowerCase());
        }
      } else if (header.type === "date") {
        const filterValue = new Date(value.value);
        const itemDate = new Date(columnValue);

        if (value.operator === "=") {
          return (
            itemDate.toISOString().substring(0, 10) ===
            filterValue.toISOString().substring(0, 10)
          );
        } else if (value.operator === "<") {
          return itemDate < filterValue;
        } else if (value.operator === ">") {
          return itemDate > filterValue;
        }
      }

      return true;
    });
  };
  const sortedData = (data) => {
    const sortedDataA = [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sortedDataA;
  };
  const getFilterInput = (column) => {
    const header = headers.find((h) => h.key === column);
    if (header.type === "number") {
      return (
        <div className="flex flex-col items-center space-x-1 gap-1">
          <select
            name={"operator"}
            value={filterValues[column]?.operator || ""}
            onChange={(e) => handleFilter(e, column)}
            className="p-1 border border-gray-300 rounded text-xs w-fit"
          >
            <option value="">All</option>
            <option value="=">{"="}</option>
            <option value="<">{"<"}</option>
            <option value=">">{">"}</option>
          </select>
          {filterValues[column] && filterValues[column]?.operator && (
            <input
              name="value"
              type="number"
              value={filterValues[column]?.value || ""}
              onChange={(e) => handleFilter(e, column)}
              className="p-1 border border-gray-300 rounded text-xs w-full"
            />
          )}
        </div>
      );
    } else if (header.type === "date") {
      return (
        <div className="flex flex-col items-center space-x-1 gap-1">
          <select
            name="operator"
            value={filterValues[column]?.operator || ""}
            onChange={(e) => handleFilter(e, column)}
            className="p-1 border border-gray-300 rounded text-xs w-fit"
          >
            <option value="">All</option>
            <option value="=">{"="}</option>
            <option value="<">{"<"}</option>
            <option value=">">{">"}</option>
          </select>
          {filterValues[column] && filterValues[column]?.operator && (
            <input
              name="value"
              type="date"
              value={filterValues[column]?.value || ""}
              onChange={(e) => handleFilter(e, column)}
              className="p-1 border border-gray-300 rounded text-xs w-full"
            />
          )}
        </div>
      );
    } else if (header.type === "string") {
      return (
        <div className="flex  flex-col items-center space-x-1 gap-1">
          <select
            name="operator"
            value={filterValues[column]?.operator || ""}
            onChange={(e) => handleFilter(e, column)}
            className="p-1 border border-gray-300 rounded text-xs w-fit"
          >
            <option value="">All</option>
            <option value="contains">like</option>
            <option value="startsWith">Start</option>
            <option value="endsWith">End</option>
          </select>
          {filterValues[column] && filterValues[column]?.operator !== "" && (
            <input
              name="value"
              type="text"
              value={filterValues[column]?.value || ""}
              onChange={(e) => handleFilter(e, column)}
              className="p-1 border border-gray-300 rounded text-xs w-full"
            />
          )}
        </div>
      );
    }

    return null;
  };

  const paginateData = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const TablePagination = ({ totalPages }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-3 py-1 sm:px-4">
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className=" mr-2 relative  cursor-default  rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs  sm:text-xs xxl:text-base sm:leading-4"
        >
          <option
            value={5}
            className=" mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs  sm:text-xs xxl:text-base"
          >
            {"5"}
          </option>
          <option
            value={10}
            className=" mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs  sm:text-xs xxl:text-base"
          >
            {"10"}
          </option>
          <option
            value={15}
            className=" mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs  sm:text-xs xxl:text-base"
          >
            {"15"}
          </option>
          <option
            value={20}
            className=" mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs  sm:text-xs xxl:text-base"
          >
            {"20"}
          </option>
          <option
            value={25}
            className=" mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs  sm:text-xs xxl:text-base"
          >
            {"25"}
          </option>
          <option
            value={30}
            className=" mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs  sm:text-xs xxl:text-base"
          >
            {"30"}
          </option>
        </select>
        <div className="flex w-full flex-1 justify-between sm:hidden">
          <a
            href="#"
            onClick={() =>
              currentPage === 1 ? "" : setCurrentPage(currentPage - 1)
            }
            className={
              currentPage === 1
                ? `relative ml-3 inline-flex items-center rounded-md border border-gray-100 bg-white px-4 py-2 text-xs xxl:text-base font-medium text-gray-400 cursor-not-allowed`
                : "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs xxl:text-base font-medium text-gray-700 hover:bg-gray-50"
            }
          >
            Previous
          </a>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="relative  cursor-default  rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs  sm:text-xs xxl:text-base sm:leading-4"
          >
            {pageNumbers.map((number) => (
              <option
                key={number}
                value={number}
                className=" mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs  sm:text-xs xxl:text-base"
              >
                {number}
              </option>
            ))}
          </select>
          <a
            href="#"
            onClick={() =>
              totalPages >= currentPage + 1
                ? setCurrentPage(currentPage + 1)
                : ""
            }
            className={
              totalPages < currentPage + 1
                ? `relative ml-3 inline-flex items-center rounded-md border border-gray-100 bg-white px-4 py-2 text-xs xxl:text-base font-medium text-gray-400 cursor-not-allowed`
                : "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs xxl:text-base font-medium text-gray-700 hover:bg-gray-50"
            }
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-xs xxl:text-base text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {currentPage * itemsPerPage - (itemsPerPage - 1)}
              </span>{" "}
              {" to "}
              <span className="font-medium">
                {currentPage * itemsPerPage >
                sortedData(tableData).filter(filterData).length
                  ? sortedData(tableData).filter(filterData).length
                  : currentPage * itemsPerPage}
              </span>{" "}
              {" of "}
              <span className="font-medium">
                {sortedData(tableData).filter(filterData).length}
              </span>
              {" results "}
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-2"
              aria-label="Pagination"
            >
              <button
                onClick={() =>
                  currentPage === 1 ? "" : setCurrentPage(currentPage - 1)
                }
                className={
                  currentPage === 1
                    ? `relative inline-flex items-center rounded-l-md px-1 py-1 text-gray-200 ring-1 ring-inset ring-gray-200 focus:z-20 focus:outline-offset-0 cursor-not-allowed`
                    : "relative inline-flex items-center rounded-l-md px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="relative cursor-default  rounded-md bg-white py-1 pl-2 pr-6 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs  sm:text-xs xxl:text-base sm:leading-4"
              >
                {pageNumbers.map((number) => (
                  <option
                    key={number}
                    value={number}
                    className=" mt-1 w-full overflow-auto rounded-md bg-white py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs  sm:text-xs xxl:text-base"
                  >
                    {number}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  totalPages >= currentPage + 1
                    ? setCurrentPage(currentPage + 1)
                    : ""
                }
                className={
                  totalPages < currentPage + 1
                    ? `relative inline-flex items-center rounded-r-md px-1 py-1 text-gray-200 ring-1 ring-inset ring-gray-200 focus:z-20 focus:outline-offset-0 cursor-not-allowed`
                    : "relative inline-flex items-center rounded-r-md px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  const totalPages = Math.ceil(
    sortedData(tableData).filter(filterData).length / itemsPerPage
  );
  return (
    <div className="">
      <div className="flex justify-between items-center gap-1 py-1 ">
        <div className="w-full ">{headerCompo}</div>
        <ExportToExcelButton data={tableData.filter(filterData)}/>
        {!disabledFilter && (
          <button
            onClick={() => setFilterState(!filterState)}
            className={`${
              filterState
                ? "p-1 bg-green-600 rounded-md text-white shadow-sm text-xs"
                : "p-1 bg-red-600 rounded-md text-white shadow-sm text-xs"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="overflow-x-auto border ">
        <table className="min-w-full bg-white border border-gray-300 ">
          <thead>
            <tr>
              {headers.map((header, index) =>
                header.sorting ? (
                  <th
                    key={index}
                    className={`cursor-pointer px-2 py-1 text-xs xxl:text-sm text-left text-white border-b bg-[#424242]`}
                    style={header.styles}
                    onClick={() => handleSort(header.key)}
                  >
                    {header.label}{" "}
                    {sortColumn === header.key && (
                      <span className="text-xs">{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </th>
                ) : (
                  <th
                    key={index}
                    className={`cursor-pointer px-2 py-1 text-xs xxl:text-sm text-left border-b text-white bg-[#424242]`}
                    style={header.styles}
                  >
                    {header.label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <tr className={`${filterState ? "" : "hidden"}`}>
              {headers.map((header, index) => (
                <td key={index} className="px-1 py-1 border">
                  {getFilterInput(header.key)}
                </td>
              ))}
            </tr>
            {paginateData(
              sortedData(tableData).filter(filterData),
              currentPage,
              itemsPerPage
            ).map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0
                    ? "bg-gray-50 hover:bg-slate-200"
                    : "hover:bg-slate-200"
                }
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-2 py-1 text-xs border "
                    style={header.styles}
                  >
                    {header.render
                      ? header.render(item[header.key], item)
                      : header.type === "date"
                      ? new Date(item[header.key]).toLocaleDateString()
                      : item[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <TablePagination totalPages={totalPages} />
        {dataFooter && <SummaryDiv data={dataFooter} />}
      </div>
    </div>
  );
};

export default Table;
