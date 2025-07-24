import { PlayerValidator } from "../validators/player.validator.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useState } from "react";
import { X } from "lucide-react";
import { CheckCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  closePlayerForm,
  setAttributesAsk,
} from "../store/playerView.slice.js";

import { setPlayerView } from "../store/playerView.slice.js";

const PlayerForm = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  console.log(accessToken);
  const [submittedData, setSubmittedData] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(PlayerValidator.schema),
    defaultValues: PlayerValidator.defaultValues,
  });

  const onError = (error) => console.log("Error: ", error);
  const onSubmit = async (data) => {
    const player = { ...data };
    console.log(player, data);

    try {
      const response = await fetch("http://localhost:3000/api/players/", {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });

      if (!response.ok) {
        console.log(await response.json());
        throw new Error("No response");
      }
 
      const createdPlayer = await response.json()
      console.log(createdPlayer)

      dispatch(setPlayerView(createdPlayer))
      dispatch(setAttributesAsk());
      setSubmittedData(true);

      console.log(response);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 inset-14  flex items-center justify-center backdrop-blur-md">
      <div
        className=" items-center justify-center px-8 py-6 text-sm rounded-md shadow-xl  border-1 border-diale
                  w-[300px] sm:w-[500px]
                 bg-secondary-900 text-neutral-100  font-semibold "
      >
        <div className="flex flex-grow items-end justify-end mb-2">
          <X
            color="#FFB22C"
            onClick={() => dispatch(closePlayerForm())}
            className="cursor-pointer"
          />
        </div>
        {submittedData ? (
          <div
            className="flex items-center justify-center px-8 py-6 text-sm rounded-md shadow-xl  border-1 border-diale
                  w-[300px] sm:w-[500px]
                 bg-secondary-900 text-neutral-100  font-semibold "
          >
            <p>Submitted player!</p>
            <CheckCheck color="B6F500" />
          </div>
        ) : (
          <form
            id="playerForm"
            onSubmit={handleSubmit(onSubmit, onError)}
            className="grid gap-x-3 gap-y-8 
      grid-cols-4 sm:grid-cols-7"
          >
            <label className="col-span-2">
              Name
              <input
                {...register("name")}
                type="text"
                name="name"
                placeholder="Name"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.name?.message && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </label>
            <label className="col-span-2">
              Nationality
              <input
                {...register("nationality")}
                type="text"
                name="nationality"
                placeholder="Nationality"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.nationality?.message && (
                <small className="text-red-500">
                  {errors.nationality.message}
                </small>
              )}
            </label>

            <label className="sm:col-span-1">
              Age
              <input
                {...register("age")}
                type="number"
                name="age"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.age?.message && (
                <small className="text-red-500">{errors.age.message}</small>
              )}
            </label>

            <label>
              Height
              <input
                {...register("height")}
                type="number"
                name="height"
                placeholder="cms"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.height?.message && (
                <small className="text-red-500">{errors.height.message}</small>
              )}
            </label>

            <label>
              Weight
              <input
                {...register("weight")}
                type="number"
                name="weight"
                placeholder="kgs"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.weight?.message && (
                <small className="text-red-500">{errors.weight.message}</small>
              )}
            </label>

            <label className="col-span-2">
              Team
              <input
                {...register("team")}
                type="text"
                name="team"
                placeholder="Team"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.team?.message && (
                <small className="text-red-500">{errors.team.message}</small>
              )}
            </label>
            <label className="col-span-2">
              Position
              <input
                {...register("position")}
                type="text"
                name="position"
                placeholder="Position"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.position?.message && (
                <small className="text-red-500">
                  {errors.position.message}
                </small>
              )}
            </label>

            <label>
              Goals
              <input
                {...register("goals")}
                type="number"
                name="goals"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.goals?.message && (
                <small className="text-red-500">{errors.goals.message}</small>
              )}
            </label>

            <label>
              Assists
              <input
                {...register("assists")}
                type="number"
                name="assists"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.assists?.message && (
                <small className="text-red-500">{errors.assists.message}</small>
              )}
            </label>

            <label>
              Apps
              <input
                {...register("appearances")}
                type="number"
                name="appearances"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.appearances?.message && (
                <small className="text-red-500">
                  {errors.appearances.message}
                </small>
              )}
            </label>

            <label className="col-span-2">
              Contract Salary
              <input
                {...register("contract_salary")}
                type="number"
                name="contract_salary"
                placeholder="Salary"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.contract_salary?.message && (
                <small className="text-red-500">
                  {errors.contract_salary.message}
                </small>
              )}
            </label>

            <label className="col-span-2">
              Contract End
              <input
                {...register("contract_end")}
                type="date"
                name="contract_end"
                placeholder="Contract End"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.contract_end?.message && (
                <small className="text-red-500">
                  {errors.contract_end.message}
                </small>
              )}
            </label>

            <label className="col-span-2">
              Martket Value
              <input
                {...register("market_value")}
                type="number"
                name="market_value"
                placeholder="Market Value"
                className="input"
                readOnly={submittedData ? true : false}
              />
              {errors.market_value?.message && (
                <small className="text-red-500">
                  {errors.market_value.message}
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

export default PlayerForm;
