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
    attributesAsk,
  } = useSelector((state) => state.playerView);

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
