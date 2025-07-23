import { useSelector } from "react-redux";

const ResumeCard = () => {
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
    <>
      <div className="flex flex-col text-center bg-primary-100 gap-3">
        <h1 className="flex justify-center items-center bg-primary-200 text-5xl p-2 rounded-md shadow-md">
          Overview
        </h1>
        <div className="h-14 flex flex-row gap-6 justify-center items-center bg-primary-200 p-2 rounded-md shadow-md">
          <p className="text-2xl">
            Total players: <span>{totalPlayers}</span>
          </p>
          <p className="text-2xl">
            Average age: <span>{averageAge}</span>
          </p>
        </div>
        <div id="tops" className="flex flex-row gap-3">
          <div
            id="table"
            className="flex flex-col w-[250px] justify-between  shadow-md rounded-md text-sm p-2 bg-primary-200"
          >
            <h2 className="text-xl font-bold">Top Scorers</h2>
            <div
              id="table titles"
              className="grid grid-cols-2 py-2  rounded-md"
            >
              <div className="flex-grow text-xl">Name</div>
              <div className="flex-grow text-xl">Goals</div>
            </div>
            {topScorers.map(({ name, goals }, index) => {
              return (
                <div
                  id="row"
                  className="grid grid-cols-2 justify-center items-center my-1 px-1 min-h-8 rounded-md
                   bg-primary-300 hover:bg-primary-400 cursor-pointer font-bold overflow-hidden
                   "
                  key={index}
                >
                  <div className="flex-grow items-center justify-center overflow-hidden">
                    {name}
                  </div>
                  <div className="flex-grow items-center justify-center overflow-hidden">
                    {goals}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            id="table"
            className="flex flex-col w-[250px] justify-between  shadow-md rounded-md text-sm p-2 bg-primary-200"
          >
            <h2 className="text-xl font-bold">Top Assists</h2>
            <div id="table titles" className="grid grid-cols-2 py-2">
              <div className="flex-grow text-xl">Name</div>
              <div className="flex-grow text-xl">Assists</div>
            </div>
            {topAssistants.map(({ name, assists }, index) => {
              return (
                <div
                  id="row"
                  className="grid grid-cols-2 justify-center items-center my-1 px-1 min-h-8 rounded-md
                   bg-primary-300 hover:bg-primary-400 cursor-pointer font-bold overflow-hidden
                   "
                  key={index}
                >
                  <div className="flex-grow items-center justify-center overflow-hidden">
                    {name}
                  </div>
                  <div className="flex-grow items-center justify-center overflow-hidden">
                    {assists}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            id="table"
            className="flex flex-col w-[250px] justify-between  shadow-md rounded-md text-sm p-2 bg-primary-200"
          >
            <h2 className="text-xl font-bold">Top Appearances</h2>
            <div id="table titles" className="grid grid-cols-2 py-2">
              <div className="flex-grow text-xl">Name</div>
              <div className="flex-grow text-xl">Appears</div>
            </div>
            {topAppearances.map(({ name, appearances }, index) => {
              return (
                <div
                  id="row"
                  className="grid grid-cols-2 justify-center items-center my-1 px-1 min-h-8 rounded-md
                   bg-primary-300 hover:bg-primary-400 cursor-pointer font-bold overflow-hidden
                   "
                  key={index}
                >
                  <div className="flex-grow items-center justify-center overflow-hidden">
                    {name}
                  </div>
                  <div className="flex-grow items-center justify-center overflow-hidden">
                    {appearances}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeCard;
