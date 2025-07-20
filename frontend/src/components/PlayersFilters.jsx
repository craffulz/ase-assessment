
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../store/players.slice.js";

const PlayersFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.players);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="filters-card">
      <h3>Filters</h3>
      <form onSubmit={handleSubmit} className="filters-form">
        <div className="filter-group">
          <label>Position:</label>
          <select
            name="position"
            value={filters.position}
            onChange={handleChange}
          >
            <option value="">All Positions</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
            <option value="Winger">Winger</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Team:</label>
          <input
            type="text"
            name="team"
            placeholder="Team name"
            value={filters.team}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label>Nationality:</label>
          <input
            type="text"
            name="nationality"
            placeholder="Country"
            value={filters.nationality}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label>Age:</label>
          <div className="age-range">
            <input
              type="number"
              name="minAge"
              placeholder="Min"
              min="16"
              max="50"
              value={filters.minAge}
              onChange={handleChange}
            />
            <span>-</span>
            <input
              type="number"
              name="maxAge"
              placeholder="Max"
              min="16"
              max="50"
              value={filters.maxAge}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="filter-actions">
          <button type="submit" className="btn-apply">
            Apply Filters
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={() => dispatch(resetFilters())}
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayersFilters;
