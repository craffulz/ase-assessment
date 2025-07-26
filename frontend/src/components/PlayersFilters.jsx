import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../store/players.slice";

const PlayersFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.players);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = (event) => {
    event.preventDefault();

    dispatch(setFilters(localFilters));
  };

  const handleReset = () => {
    setLocalFilters({
      position: "",
      team: "",
      nationality: "",
      minAge: 16,
    });
    dispatch(resetFilters());
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-semibold text-gray-900">Filters</h3>
      <form
        className="grid grid-cols-4 gap-2 p-3 text-gray-900 text-sm font-bold"
        onSubmit={handleApply}
      >
        <select
          name="position"
          value={localFilters.position || ""}
          onChange={handleChange}
          className="col-span-4 flex flex-col items-center justify-center bg-secondary-500 rounded-md h-12"
        >
          <option value="">All Positions</option>
          <option value="Goalkeeper">Goalkeeper</option>
          <option value="Defender">Defender</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Forward">Forward</option>
        </select>

        <input
          className="col-span-2 flex flex-col grow items-center justify-center bg-secondary-500 rounded-md h-12 "
          type="text"
          name="team"
          value={localFilters.team || ""}
          onChange={handleChange}
          placeholder="Team"
        />

        <input
          className="col-span-2 flex flex-col items-center justify-center bg-secondary-500 rounded-md h-12"
          type="text"
          name="nationality"
          placeholder="Country"
          value={localFilters.nationality || ""}
          onChange={handleChange}
        />

        <div className="col-span-2 flex flex-col items-center justify-center bg-secondary-500 rounded-md p-2">
          <label className="text-xs mb-1">
            Min Age: {localFilters.minAge || 16}
          </label>
          <input
            type="range"
            name="minAge"
            min="16"
            max="50"
            value={localFilters.minAge || 16}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="col-span-2 flex flex-col sm:flex sm:flex-row items-center sm:gap-3 justify-between sm:p-2 rounded-md bg-secondary-500">
          <button
            type="submit"
            className="btn-apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply Filters
          </button>
          <button
            type="button"
            className="btn-reset px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayersFilters;
