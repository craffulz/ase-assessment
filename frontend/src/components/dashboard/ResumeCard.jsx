import { useSelector } from "react-redux";
import PlayersFilters from "../PlayersFilters.jsx";
import { useDispatch } from "react-redux";
import { setPlayerView } from "../../store/playerView.slice.js";
const ResumeCard = () => {
  const dispatch = useDispatch();
  const { players, loading, error } = useSelector((state) => state.players);
  //calculate total players
  const totalPlayers = players.length;
  //calculate age
  const allAges = players.map(({ age }) => age);
  const averageAge = parseFloat(
    allAges.reduce((sum, age) => sum + age, 0) / totalPlayers
  ).toFixed(0);
  //calculate some perfomances top-goal top-assist top-appearances
  const topScorers = [...players].sort((a, b) => b.goals - a.goals).slice(0, 3);
  const topAssistants = [...players]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 3);
  const topAppearances = [...players]
    .sort((a, b) => b.appearances - a.appearances)
    .slice(0, 3);

  if (loading) return <h2>Loading...</h2>;
  if (error) console.log(error);
  return (
    <div
      id="resume-card"
      className="col-span-8 grid grid-cols-8 text-center gap-3 p-2 rounded-md bg-secondary-700 text-neutral-100"
    >
      <div
        className="grid-cols-8 bg-secondary-400 col-span-8 h-full rounded-md
                        sm:col-span-4 md:col-span-4 
      "
      >
        <PlayersFilters />
      </div>
      <div
        id="totalPlayersAverageAge"
        className="col-span-8 flex flex-row items-center justify-around h-full p-2 gap-x-4 rounded-md bg-secondary-900 font-semibold text-lg
                    sm:text-2xl  sm:col-span-4 sm:flex sm:flex-col 
                      md:flex md:flex-col md:text-2xl md:col-span-4  
                        xl:col-span-1
       "
      >
        <p className="flex flex-col items-center justify-center">
          <span>Total players </span>
          <span
            className="text-diale text-xl 
                          sm:text-2xl
                              md:text-2xl"
          >
            {totalPlayers}
          </span>
        </p>
        <p className="flex flex-col items-center justify-center">
          <span>Average age </span>
          <span
            className="text-diale text-xl 
                          sm:text-2xl
                            md:text-2xl"
          >
            {averageAge}
          </span>
        </p>
      </div>

      <div
        id="table"
        className="col-span-8 flex flex-col justify-between shadow-md rounded-md text-sm p-2 bg-secondary-900
                    sm:col-span-4
                      md:col-span-2
                        xl:col-span-1"
      >
        <h2 className="text-xl font-bold mb-2 ">Top Goals</h2>
        {/* <div
          id="table titles"
          className="grid grid-cols-2 py-2 bg-secondary rounded-md"
        >
          <div className="flex-grow text-lg">Name</div>
          <div className="flex-grow text-lg">Goals</div>
        </div> */}
        {topScorers.map((player, index) => {
          return (
            <div
              onClick={() => dispatch(setPlayerView(player))}
              id="row"
              className="grid grid-cols-2 justify-center items-center my-1 px-1 min-h-8 rounded-md
                   bg-secondary-700 hover:bg-secondary-800 cursor-pointer font-bold overflow-hidden
                   "
              key={index}
            >
              <div className="flex-grow items-center justify-center overflow-hidden">
                {player.name}
              </div>
              <div className="flex-grow items-center justify-center overflow-hidden text-diale">
                {player.goals}
              </div>
            </div>
          );
        })}
      </div>
      <div
        id="table"
        className="col-span-8 flex flex-col justify-between shadow-md rounded-md text-sm p-2 bg-secondary-900
                            sm:col-span-4
                              md:col-span-2
                                xl:col-span-1"
      >
        <h2 className="text-xl font-bold mb-2">Top Assists</h2>
        {/* <div id="table titles" className="grid grid-cols-2 py-2">
          <div className="flex-grow text-lg">Name</div>
          <div className="flex-grow text-lg">Assists</div>
        </div> */}
        {topAssistants.map((player, index) => {
          return (
            <div
              onClick={() => dispatch(setPlayerView(player))}
              id="row"
              className="grid grid-cols-2 justify-center items-center my-1 px-1 min-h-8 rounded-md
                  bg-secondary-700 hover:bg-secondary-800 cursor-pointer font-bold overflow-hidden
                   "
              key={index}
            >
              <div className="flex-grow items-center justify-center overflow-hidden">
                {player.name}
              </div>
              <div className="flex-grow items-center justify-center overflow-hidden text-diale">
                {player.assits}
              </div>
            </div>
          );
        })}
      </div>
      <div
        id="table"
        className="col-span-8 flex flex-col justify-between shadow-md rounded-md text-sm p-2 bg-secondary-900
                    sm:col-span-4
                      md:col-span-2
                        xl:col-span-1"
      >
        <h2 className="text-xl font-bold mb-2">Top Appearances</h2>
        {/* <div id="table titles" className="grid grid-cols-2 py-2">
          <div className="flex-grow text-lg">Name</div>
          <div className="flex-grow text-lg">Appears</div>
        </div> */}
        {topAppearances.map((player, index) => {
          return (
            <div
              onClick={() => dispatch(setPlayerView(player))}
              id="row"
              className="grid grid-cols-2 justify-center items-center my-1 px-1 min-h-8 rounded-md
                   bg-secondary-700 hover:bg-secondary-800 cursor-pointer font-bold overflow-hidden
                   "
              key={index}
            >
              <div className="flex-grow items-center justify-center overflow-hidden">
                {player.name}
              </div>
              <div className="flex-grow items-center justify-center overflow-hidden text-diale">
                {player.appearances}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeCard;
