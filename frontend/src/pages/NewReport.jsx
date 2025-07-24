import React from "react";
import ReportForm from "../forms/ReportForm.jsx";

const NewReport = () => {
  return (
    <div
      className="flex items-center justify-center
       w-[300px] sm:w-[500px] 
      bg-primary-200 p-4 font-semibold text-sm rounded-md"
    >
      <ReportForm />
    </div>
  );
};

export default NewReport;
