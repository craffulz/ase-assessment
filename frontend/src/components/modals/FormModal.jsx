import React from "react";

const FormModal = ({ setShowAtts, message, setModalActive }) => {
  console.log("holaaa", setShowAtts);
  return (
    <div
      id="modal"
      className="fixed w-full h-full z-50
       flex flex-col items-center justify-center
    backdrop-blur-xl"
    >
      <div
        className="flex flex-col w-[200px] gap-3 p-4 items-center justify-center
      rounded-md bg-primary-300 "
      >
        {message}
        <div className="flex flex-row justify-between p-2 gap-4">
          <button
            onClick={() => {
              setModalActive(false);
              setShowAtts(true);
            }}
            className="btn-primary"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setModalActive(false);
            }}
            className="btn-danger"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
