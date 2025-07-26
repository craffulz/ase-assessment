import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayerValidator } from "../validators/player.validator.js";
import { closePlayerView } from "../store/playerView.slice.js";

import { API_URL } from "../config/config.js";
const PlayerView = () => {
  const URL = API_URL;

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(true);
  const { player } = useSelector((state) => state.playerView);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",

    resolver: zodResolver(PlayerValidator.schema),
    defaultValues: player,
  });
  console.log(player);

  const onError = (error) => console.log("Error: ", error);
  const onSubmit = async (data) => {
    const player = { ...data };
    console.log(player, data);

    try {
      const response = await fetch(`${URL}/api/players/`, {
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

      const createdPlayer = await response.json();
      console.log(createdPlayer);

      // dispatch(setPlayerView(createdPlayer))
      // dispatch(setAttributesAsk());
      // setediting(true);

      console.log(response);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 inset-14  flex items-center justify-center backdrop-blur-md text-neutral-100  ">
      <div className="bg-secondary-800 p-4 rounded-md border-1 border-diale">
        <div className="flex flex-grow justify-end items-end">
          <X
            color="#FFB22C"
            className="cursor-pointer"
            onClick={() => dispatch(closePlayerView())}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          id="playerForm"
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
              readOnly={editing}
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
              readOnly={editing}
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
              readOnly={editing}
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
              readOnly={editing}
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
              readOnly={editing}
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
              readOnly={editing}
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
              readOnly={editing}
            />
            {errors.position?.message && (
              <small className="text-red-500">{errors.position.message}</small>
            )}
          </label>

          <label>
            Goals
            <input
              {...register("goals")}
              type="number"
              name="goals"
              className="input"
              readOnly={editing}
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
              readOnly={editing}
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
              readOnly={editing}
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
              readOnly={editing ? "true" : "false"}
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
              readOnly={editing}
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
              readOnly={editing}
            />
            {errors.market_value?.message && (
              <small className="text-red-500">
                {errors.market_value.message}
              </small>
            )}
          </label>
          <div className="flex flex-col  justify-end">
            {editing ? (
              <button
                type="submit"
                className="btn-primary flex items-center justify-center
           h-2/3 border-3 border-primary-800"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="btn-primary flex items-center justify-center
           h-2/3 border-3 border-primary-800"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerView;
