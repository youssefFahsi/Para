import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

const SweetAlert = ({ actionTitle, onClose, onAction, title, desc, type,onActionNo,actionNoTitle }) => {
  const error =
    "inline-flex w-full justify-center rounded-sm bg-red-700 px-2 py-1 xxl:text-lg text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto";
  const success =
    "inline-flex w-full justify-center rounded-sm bg-green-700 px-2 py-1 xxl:text-lg text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto";

  const warning =
    "inline-flex w-full justify-center rounded-sm bg-yellow-700 px-2 py-1 xxl:text-lg text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto";

  const info =
    "inline-flex w-full justify-center rounded-sm bg-blue-700 px-2 py-1 xxl:text-lg text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto";

  const errorLineT = "border-t-4 border-red-600";
  const errorLineB = "border-b-4 border-red-600";

  const successLineT = "border-t-4 border-green-600";
  const successLineB = "border-b-4 border-green-600";

  const warningLineT = "border-t-4 border-yellow-600";
  const warningLineB = "border-b-4 border-yellow-600";

  const infoLineT = "border-t-4 border-blue-600";
  const infoLineB = "border-b-4 border-blue-600";
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        //initialFocus={cancelButtonRef}
        onClose={() => ""}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-0"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-0"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-md text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg `}
              >
                <div
                  className={`flex justify-between items-center p-2 bg-[#424242] ${
                    type === "error"
                      ? errorLineB
                      : type === "success"
                      ? successLineB
                      : type === "warning"
                      ? warningLineB
                      : infoLineB
                  }`}
                >
                  <div>
                    <h2 className="text-white xxl:text-lg text-sm"> {title}</h2>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => {
                        onClose(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 xxl:h-6 xxl:w-6  text-[#424242] bg-white   hover:text-white hover:bg-red-700  shadow-sm  rounded-full  p-1 "
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
                <div
                  className={` px-4 py-5 sm:p-6 ${
                    type === "error"
                      ? "bg-red-50 bg-opacity-85"
                      : type === "success"
                      ? "bg-green-50  bg-opacity-85"
                      : type === "warning"
                      ? "bg-yellow-50 bg-opacity-85"
                      : "bg-blue-50  bg-opacity-85"
                  }`}
                >
                  <div className="flex justify-start items-center gap-2 ">
                    <div
                      className={`mx-auto flex xxl:h-14 xxl:w-14  h-12 w-12 flex-shrink-0 items-center justify-center rounded-full  sm:mx-0 sm:h-10 sm:w-10 ${
                        type === "error"
                          ? "bg-red-100"
                          : type === "success"
                          ? "bg-green-100"
                          : type === "warning"
                          ? "bg-yellow-100"
                          : "bg-blue-100"
                      }`}
                    >
                      {type === "error" ? (
                        <ExclamationTriangleIcon
                          className="xxl:h-8 xxl:w-8  h-6 w-6 text-red-600  "
                          aria-hidden="true"
                        />
                      ) : type === "success" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="xxl:h-8 xxl:w-8  h-6 w-6 text-green-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : type === "warning" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="xxl:h-8 xxl:w-8  h-6 w-6 text-yellow-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="xxl:h-8 xxl:w-8  h-6 w-6 text-blue-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="xxl:text-lg text-sm">{desc}</div>
                  </div>
                </div>
                <div
                  className={`bg-[#424242] px-2 py-2 sm:flex sm:flex-row-reverse sm:px-6  ${
                    type === "error"
                      ? errorLineT
                      : type === "success"
                      ? successLineT
                      : type === "warning"
                      ? warningLineT
                      : infoLineT
                  }`}
                >
                  <button
                    type="button"
                    className={
                      type === "error"
                        ? error
                        : type === "success"
                        ? success
                        : type === "warning"
                        ? warning
                        : info
                    }
                    onClick={() => onAction()}
                  >
                    {actionTitle}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-sm bg-white px-2 py-1 xxl:text-lg text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => actionNoTitle ? onActionNo() :onClose(false)}
                    // ref={cancelButtonRef}
                  >
                   {actionNoTitle ? actionNoTitle :"Cancel"} 
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SweetAlert;
