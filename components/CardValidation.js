import moment from "moment";
import React, { useState } from "react";

const CardValidation = ({ data, selected, setSelected }) => {
  const itemsPerPage = 4; // Number of cards to display per page
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  return (
    <>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentData &&
          currentData.map((item) => (
            <div
            onClick={() => setSelected(item)}
              key={item?.id}
              className={` bg-white rounded-sm border-2 overflow-hidden outline-none hover:shadow-xl cursor-pointer ${
                selected?.id === item?.id
                  ? "shadow-2xl border-2 border-[#424242]"
                  : "shadow border-[#e5e7eb]"
              }`}
            >
              <div className="p-2 bg-[#f7f7f7] border-y  ">
                <h3 className="text-sm font-semibold text-center">
                  Validation id : {item.id}
                </h3>
              </div>
              <div className="p-2">
                <div className="mb-2 flex justify-start items-center gap-1">
                  <h3 className="text-sm font-semibold">Montant : </h3>
                  <p className="text-xs text-gray-700">
                    {item?.montant.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="mb-2 flex justify-start items-center gap-1">
                  <h3 className="text-sm font-semibold">Emitter : </h3>
                  <p className=" text-xs text-gray-700">{item?.emitter}</p>
                </div>
                <div className="mb-2 flex justify-start items-center gap-1">
                  <h3 className="text-sm font-semibold">Receiver : </h3>
                  <p className="text-xs text-gray-700">{item?.receiver}</p>
                </div>
                <div className="mb-2 flex justify-start items-center gap-1">
                  <h3 className="text-sm font-semibold">Creation : </h3>
                  <p className="text-xs text-gray-700">
                    {moment(new Date(item?.createdAt)).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="mb-2 flex justify-start items-center gap-1">
                  <h3 className="text-sm font-semibold">Event : </h3>
                  <p className="text-xs text-gray-700">
                    {moment(new Date(item?.eventDate)).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
           
            </div>
          ))}
      </div>

      <div className="flex justify-center mt-4 mb-2">
        <nav>
          <ul className="flex justify-center items-center gap-2 p-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`px-2 text-sm rounded-md border cursor-pointer outline-none ${
                  currentPage === index + 1 ? "bg-[#424242] text-white" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CardValidation;
