import { useState } from "react";
import PlayerForm from "../forms/PlayerForm.jsx";
import PlayerAttributesForm from "../forms/PlayerAttributesForm.jsx";
import FormModal from "../components/modals/FormModal.jsx";

const NewPlayer = () => {
  const [showAtts, setShowAtts] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  console.log("showAtts", showAtts);
  console.log("modale", modalActive);
  return (
    <div
      className="flex items-center justify-center
       w-[300px] sm:w-[500px] 
      bg-primary-200 p-4 font-semibold text-sm rounded-md"
    >
      {showAtts ? (
        <PlayerAttributesForm />
      ) : (
        <PlayerForm setModalActive={setModalActive} />
      )}
      {modalActive && (
        <FormModal
          setModalActive={setModalActive}
          setShowAtts={setShowAtts}
          message="Add player stats now?"
        />
      )}
    </div>
  );
};

export default NewPlayer;
