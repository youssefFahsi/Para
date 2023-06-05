import React from "react";

const Alert = ({ text, setClose }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-2 my-2 flex justify-between items-center">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 1.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zM8.5 6a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 003 0v-3a1.5 1.5 0 00-1.5-1.5zm3 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-sm font-medium text-red-500">{text}</h3>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={() => setClose(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500 hover:text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
