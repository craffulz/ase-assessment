import React from "react";
import { useSelector } from "react-redux";

const PlayerView = () => {
  const player = useSelector((state) => state.player);
  console.log(player);
  return (
    <div>
    
      <form
        id="playerForm"
        className="grid gap-x-3 gap-y-8 
      grid-cols-4 sm:grid-cols-7"
      >
        <label className="col-span-2">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input"
            readOnly
          />
        </label>
        <label className="col-span-2">
          Nationality
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            className="input"
            readOnly
          />
        </label>

        <label className="sm:col-span-1">
          Age
          <input type="number" name="age" className="input" readOnly />
        </label>

        <label>
          Height
          <input
            type="number"
            name="height"
            placeholder="cms"
            className="input"
            readOnly
          />
        </label>

        <label>
          Weight
          <input
            type="number"
            name="weight"
            placeholder="kgs"
            className="input"
            readOnly
          />
        </label>

        <label className="col-span-2">
          Team
          <input
            type="text"
            name="team"
            placeholder="Team"
            className="input"
            readOnly
          />
        </label>
        <label className="col-span-2">
          Position
          <input
            type="text"
            name="position"
            placeholder="Position"
            className="input"
            readOnly
          />
        </label>

        <label>
          Goals
          <input type="number" name="goals" className="input" readOnly />
        </label>

        <label>
          Assists
          <input type="number" name="assists" className="input" readOnly />
        </label>

        <label>
          Apps
          <input type="number" name="appearances" className="input" readOnly />
        </label>

        <label className="col-span-2">
          Contract Salary
          <input
            type="number"
            name="contract_salary"
            placeholder="Salary"
            className="input"
            readOnly
          />
        </label>

        <label className="col-span-2">
          Contract End
          <input
            type="date"
            name="contract_end"
            placeholder="Contract End"
            className="input"
            readOnly
          />
        </label>

        <label className="col-span-2">
          Martket Value
          <input
           
            type="number"
            name="market_value"
            placeholder="Market Value"
            className="input"
            readOnly
          />
        </label>
        <div className="flex flex-col  justify-end">
          <button
            type="submit"
            className="btn-primary flex items-center justify-center
           h-2/3 border-3 border-primary-800"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerView;
