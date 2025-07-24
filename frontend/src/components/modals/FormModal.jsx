import React from "react";
import { useDispatch } from "react-redux";
import {
  setAttributesForm,
  closeAttributesAsk,
} from "../../store/playerView.slice";
const FormModal = () => {
  const dispatch = useDispatch();

  return (
    <div
      id="modal"
      className="fixed top-0 right-0 bottom-0 left-0 z-50 inset-14  flex items-center justify-center backdrop-blur-md"
    >
      <div
        className=" items-center justify-center px-8 py-6 text-sm rounded-md shadow-xl text-center border-1 border-diale
                  w-[300px] sm:w-[500px]
                 bg-secondary-900 text-neutral-100  font-semibold "
      >
        Do you want to fill player attributes now?
        <div className="flex flex-row justify-around p-2 gap-4">
          <button
            onClick={() => {
              dispatch(setAttributesForm());
              dispatch(closeAttributesAsk());
            }}
            className="btn-primary"
          >
            Yes
          </button>
          <button
            onClick={() => {
              dispatch(closeAttributesAsk());
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
