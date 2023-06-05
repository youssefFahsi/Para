import { useState, useEffect, useRef } from "react";

const DynamicTable = ({ headers, data, itemsPerPage = 5, reff }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [focusedRowIndex, setFocusedRowIndex] = useState(0);

  useEffect(() => {
    reff.current.focus();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (currentPage < totalPages) {
        if (focusedRowIndex < itemsPerPage - 1) {
          setFocusedRowIndex((prevIndex) => prevIndex + 1);
        } else {
          handlePageChange(currentPage + 1);
          setFocusedRowIndex(0);
        }
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (focusedRowIndex > 0) {
        setFocusedRowIndex((prevIndex) => prevIndex - 1);
      } else if (currentPage > 1) {
        handlePageChange(currentPage - 1);
        setFocusedRowIndex(itemsPerPage - 1);
      }
    } else if (event.key === "Enter" && focusedRowIndex !== -1) {
      event.preventDefault();
      const emailInput = document.getElementById(`email-${focusedRowIndex}`);
      if (emailInput && !emailInput.hasFocus) {
        emailInput.focus();
        emailInput.select();
      }
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table
        className="w-full border-collapse"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        ref={reff}
      >
        {/* Table header */}
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header) => (
              <th key={header.key} className="p-2 text-left">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={header.key} className="p-2">
                  {header.render ? (
                    <div
                      className={
                        focusedRowIndex === rowIndex ? "bg-yellow-200" : ""
                      }
                    >
                      {header.render(row[header.key], row, rowIndex, colIndex)}
                    </div>
                  ) : (
                    row[header.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          className="px-2 py-1 border border-gray-300  disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          className="px-2 py-1 border border-gray-300 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;
