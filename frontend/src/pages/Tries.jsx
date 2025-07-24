import PlayerAttributesForm from "../forms/PlayerAttributesForm.jsx";
import PlayerForm from "../forms/PlayerForm.jsx";
import ReportForm from "../forms/ReportForm.jsx";

const Tries = () => {
  // const dispatch = useDispatch();
  // const { accessToken } = useSelector((state) => state.user);
  // const { players, filters, sort, loading, error } = useSelector(
  //   (state) => state.players
  // );

  // useEffect(() => {
  //   dispatch(
  //     fetchPlayers({
  //       accessToken: accessToken,
  //       limit: null,
  //       filters: filters,
  //       sort: sort,
  //     })
  //   );
  // }, [accessToken, dispatch, filters, sort]);

  // const teams = [...players].map(({ team }) => team);
  // const positions = [...players].map(({ position }) => position);
  // const teamsSet = new Set(teams);
  // const positionsSet = new Set(positions);

  // const playersPerTeams = [];
  // teamsSet.forEach((value) => {
  //   const playersInTeam = [...players].filter(
  //     ({ team }) => team === value
  //   ).length;
  //   playersPerTeams.push({ name: value, value: playersInTeam });
  // });

  // const playersPerPosition = [];
  // positionsSet.forEach((value) => {
  //   const playersInPosition = [...players].filter(
  //     ({ position }) => position === value
  //   ).length;
  //   playersPerPosition.push({ name: value, value: playersInPosition });
  // });

  // console.log(playersPerTeams, playersPerPosition);

  // if (loading) return <h2>Loading...</h2>;
  // if (error) console.log("Error: ", error.message);

  return (
    <>
      <PlayerForm />
      <PlayerAttributesForm />
      <ReportForm />
    </>
  );
};

export default Tries;
