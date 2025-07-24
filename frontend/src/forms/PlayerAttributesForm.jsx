import { useState } from "react";
import { PlayerAttributesValidator } from "../validators/playerAttributes.validator.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
const PlayerAttributesForm = () => {
  const [submittedData, setSubmittedData] = useState(false);
  const { accessToken } = useSelector((state) => state.user);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(PlayerAttributesValidator.schema),
    defaultValues: PlayerAttributesValidator.defaultValues,
  });

  const onError = (error) => console.log("Error: ", error);
  const onSubmit = async (data) => {
    const playerAttributes = { ...data };

    try {
      const response = await fetch(
        "http://localhost:3000/api/playerAttributes/",
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playerAttributes),
        }
      );

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
      id="playerAttributesForm"
      className="
      w-[300px] sm:w-[500px] 
      bg-secondary-900 text-neutral-100 px-8 py-6 rounded-md font-semibold text-sm"
    >
      <div className="flex flex-grow items-end justify-end mb-2">
        <X className="cursor-pointer" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid grid-cols-3 gap-4"
      >
        <label>
          Pace
          <input
            readOnly={submittedData ? true : false}
            {...register("pace")}
            type="number"
            name="pace"
            className="input"
          />
          {errors.pace?.message && (
            <small className="text-red-500">{errors.pace.message}</small>
          )}
        </label>

        <label>
          Shooting
          <input
            readOnly={submittedData ? true : false}
            {...register("shooting")}
            type="number"
            name="shooting"
            className="input"
          />
          {errors.shooting?.message && (
            <small className="text-red-500">{errors.shooting.message}</small>
          )}
        </label>

        <label>
          Passing
          <input
            readOnly={submittedData ? true : false}
            {...register("passing")}
            type="number"
            name="passing"
            className="input"
          />
          {errors.passing?.message && (
            <small className="text-red-500">{errors.passing.message}</small>
          )}
        </label>

        <label>
          Defending{" "}
          <input
            readOnly={submittedData ? true : false}
            {...register("defending")}
            type="number"
            name="defending"
            className="input"
          />
          {errors.defending?.message && (
            <small className="text-red-500">{errors.defending.message}</small>
          )}
        </label>

        <label>
          Dribbling
          <input
            readOnly={submittedData ? true : false}
            {...register("dribbling")}
            type="number"
            name="dribbling"
            className="input"
          />
          {errors.dribbling?.message && (
            <small className="text-red-500">{errors.dribbling.message}</small>
          )}
        </label>

        <button
          disabled={submittedData ? true : false}
          type="submit"
          className="btn-primary"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default PlayerAttributesForm;
