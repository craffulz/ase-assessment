import React from "react";
import { useSelector } from "react-redux";
import PlayerForm from "../../forms/PlayerForm.jsx";
const GlobalModals = () => {
  const {
    playerView,
    playerForm,
    attributesForm,
    reportForm,
    modalAttributes,
    sureAboutDelete,
  } = useSelector((state) => state.playerView);
  return <>
  {playerView && <PlayerForm/>}
  {playerForm && <PlayerForm/>}
  </>;
};

export default GlobalModals;
