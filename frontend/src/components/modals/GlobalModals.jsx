import React from "react";
import { useSelector } from "react-redux";
import PlayerForm from "../../forms/PlayerForm.jsx";
import PlayerView from "../PlayerView.jsx";
import PlayerAttributesForm from "../../forms/PlayerAttributesForm.jsx";
import ReportForm from "../../forms/ReportForm.jsx";
import FormModal from "./FormModal.jsx";
const GlobalModals = () => {
  const {
    playerView,
    playerForm,
    attributesForm,
    reportForm,
    modalAttributes,
    sureAboutDelete,
    attributesAsk,
  } = useSelector((state) => state.playerView);
  console.log(
    playerView,
    playerForm,
    attributesForm,
    reportForm,
    modalAttributes,
    sureAboutDelete
  );
  return (
    <div>
      {playerView && <PlayerView />}
      {playerForm && <PlayerForm />}
      {attributesForm && <PlayerAttributesForm />}
      {reportForm && <ReportForm />}
      {attributesAsk && <FormModal />}
    </div>
  );
};

export default GlobalModals;
