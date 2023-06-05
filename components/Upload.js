import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Upload = ({ uploadImage,disabled }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    previewFile(file);
    setFileInputState(e.target.value);

    uploadImage(file)
  };

  const previewFile = (file) => {
    if (!file) {
      return setPreviewSource("");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };



  return (
    <div>
     
      <div className="my-2 flex  justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-3 ">
        <div className="text-center w-full flex justify-around items-center gap-2">
          <div className="flex justify-center items-center">
            {previewSource ? (
              <div className="w-48 h-auto flex justify-center items-center">
                <img
                  src={previewSource}
                  alt="chosen"
                  className="h-full w-auto mx-auto rounded-md shadow-md"
                />
              </div>
            ) : (
              <PhotoIcon
                className="mx-auto w-48 h-auto text-gray-300"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="w-full ">
            <div className=" flex justify-center text-sm leading-6 text-gray-600">
              <label
                htmlFor="fileInput"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Select an image</span>

                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="hidden"
                  disabled={disabled}
                />
              </label>
            </div>
            {previewSource && (
              <div className="flex justify-around items-center gap-1">
             
              <button
                type="button"
                className="relative cursor-pointer mt-1 rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                onClick={()=>{
                  setFileInputState("") 
                  setPreviewSource("")
                  uploadImage(null)
                }}
              >
                { "Cancel" }
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
