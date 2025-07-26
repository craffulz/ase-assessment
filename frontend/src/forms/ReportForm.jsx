import { useState } from "react";
import { ScoutReportsValidator } from "../validators/report.validator.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { closeReportForm } from "../store/playerView.slice.js";
import { X } from "lucide-react";
import { CheckCheck } from "lucide-react";

import { API_URL } from "../config/config.js";

const ReportForm = () => {
  const URL = API_URL
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const [submittedData, setSubmittedData] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(ScoutReportsValidator.schema),
    defaultValues: ScoutReportsValidator.defaultValues,
  });

  const onError = (error) => console.log("Error: ", error);
  const onSubmit = async (data) => {
    const report = { ...data };

    try {
      const response = await fetch(`${URL}/api/reports/`, {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });

      if (!response.ok) {
        console.log(await response.json());
        throw new Error("No response");
      }

      setSubmittedData(true);

      console.log(response);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div
      id="playerForm"
      className="fixed top-0 right-0 bottom-0 left-0 z-50 inset-14  flex items-center justify-center backdrop-blur-md"
    >
      <div
        className=" items-center justify-center px-8 py-6 text-sm rounded-md shadow-xl  border-1 border-diale
                  w-[300px] sm:w-[500px]
                 bg-secondary-900 text-neutral-100  font-semibold "
      >
        <div className="flex flex-grow items-end justify-end mb-2">
          <X
            color="#FFB22C"
            onClick={() => dispatch(closeReportForm())}
            className="cursor-pointer"
          />
        </div>
        {submittedData ? (
          <div className="flex flex-col p-8 text-neutral-100 font-bold text-5xl">
            <p>Submitted report!</p>
            <CheckCheck color="B6F500" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="grid grid-cols-2 gap-8"
          >
            <label>
              Match Date
              <input
                readOnly={submittedData ? true : false}
                {...register("match_date")}
                type="date"
                name="match_date"
                placeholder="Enter match_date"
                className="input"
              />
              {errors.match_date?.message && (
                <small className="text-red-500">
                  {errors.match_date.message}
                </small>
              )}
            </label>

            <label>
              Overall Rating
              <input
                readOnly={submittedData ? true : false}
                {...register("overall_rating")}
                type="text"
                name="overall_rating"
                className="input"
              />
              {errors.overall_rating?.message && (
                <small className="text-red-500">
                  {errors.overall_rating.message}
                </small>
              )}
            </label>

            <label>
              Strengths
              <input
                {...register("strengths")}
                type="text"
                name="strengths"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.strengths?.message && (
                <small className="text-red-500">
                  {errors.strengths.message}
                </small>
              )}
            </label>

            <label>
              Weaknesses
              <input
                {...register("weaknesses")}
                type="text"
                name="weaknesses"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.weaknesses?.message && (
                <small className="text-red-500">
                  {errors.weaknesses.message}
                </small>
              )}
            </label>

            <label>
              Recommendation
              <input
                {...register("recommendation")}
                type="text"
                name="recommendation"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.recommendation?.message && (
                <small className="text-red-500">
                  {errors.recommendation.message}
                </small>
              )}
            </label>

            <div className="flex flex-col  justify-end">
              <button
                disabled={submittedData ? true : false}
                type="submit"
                className="btn-primary flex items-center justify-center
           h-2/3 border-3 border-primary-800"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportForm;
