import React from "react";
import { PlayerValidator } from "../validators/player.validator.jsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers";
import {useSelector} from 'react-redux'
const PlayerForm = () => {
    const {accessToken} = useSelector((state) => state.users)

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

    try {
      const response = await fetch("http://localhost:3000/api/players/", {
        credentials: "include",
        method: "POST",
        headers: {
            Authorization : `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(...player),
      });

      if (!response.ok) {
        console.log(await response.json());
        throw new Error("No response");
      }

      console.log(response);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div id="reportForm" className="">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-y-2 "
      >
        <label>Name</label>
        <input
          {...register("name")}
          type="text"
          name="name"
          placeholder="Enter name"
          className="input"
        />
        {errors.name?.message && (
          <small className="text-red-500">{errors.name.message}</small>
        )}
        <label>Position</label>
        <input
          {...register("position")}
          type="text"
          name="position"
          placeholder="Position"
          className="input"
        />
        {errors.position?.message && (
          <small className="text-red-500">{errors.position.message}</small>
        )}
        <label>Age</label>
        <input
          {...register("age")}
          type="text"
          name="age"
          placeholder="Age"
          className="input"
        />
        {errors.age?.message && (
          <small className="text-red-500">{errors.age.message}</small>
        )}
        <label>Team</label>
        <input
          {...register("team")}
          type="text"
          name="team"
          placeholder="team"
          className="input"
        />
        {errors.team?.message && (
          <small className="text-red-500">{errors.team.message}</small>
        )}
        <label>Nationality</label>
        <input
          {...register("nationality")}
          type="text"
          name="nationality"
          placeholder="nationality"
          className="input"
        />
        {errors.nationality?.message && (
          <small className="text-red-500">{errors.nationality.message}</small>
        )}
        <label>Height</label>
        <input
          {...register("height")}
          type="text"
          name="height"
          placeholder="height"
          className="input"
        />
        {errors.height?.message && (
          <small className="text-red-500">{errors.height.message}</small>
        )}
        <label>Weight</label>
        <input
          {...register("weight")}
          type="text"
          name="weight"
          placeholder="weight"
          className="input"
        />
        {errors.weight?.message && (
          <small className="text-red-500">{errors.weight.message}</small>
        )}
        <label>Goals</label>
        <input
          {...register("goals")}
          type="text"
          name="goals"
          placeholder="goals"
          className="input"
        />
        {errors.goals?.message && (
          <small className="text-red-500">{errors.goals.message}</small>
        )}
        <label>Assists</label>
        <input
          {...register("assists")}
          type="text"
          name="assists"
          placeholder="assists"
          className="input"
        />
        {errors.assists?.message && (
          <small className="text-red-500">{errors.assists.message}</small>
        )}
        <label>Appearances</label>
        <input
          {...register("appearances")}
          type="text"
          name="appearances"
          placeholder="appearances"
          className="input"
        />
        {errors.appearances?.message && (
          <small className="text-red-500">{errors.appearances.message}</small>
        )}
        <label>Contract Salary</label>
        <input
          {...register("contract_salary")}
          type="text"
          name="contract_salary"
          placeholder="contract_salary"
          className="input"
        />
        {errors.contract_salary?.message && (
          <small className="text-red-500">
            {errors.contract_salary.message}
          </small>
        )}
        <label>Contract End</label>
        <input
          {...register("contract_end")}
          type="text"
          name="contract_end"
          placeholder="contract_end"
          className="input"
        />
        {errors.contract_end?.message && (
          <small className="text-red-500">{errors.contract_end.message}</small>
        )}
        <label>Martket Value</label>
        <input
          {...register("market_value")}
          type="text"
          name="market_value"
          placeholder="market_value"
          className="input"
        />
        {errors.market_value?.message && (
          <small className="text-red-500">{errors.market_value.message}</small>
        )}

        <button type="submit" className="btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
