import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/players.slice.js";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { ArrowRightToLine } from "lucide-react";
import { ArrowLeftToLine } from "lucide-react";

const Pagination = () => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.players);
  const { currentPage, totalPages } = pagination;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  const getPageRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex flex-col text-neutral-100 font-semibold p-2">
      <div className="flex flex-row text-2xl gap-2 items-center justify-center">
        <button
          className="cursor-pointer"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftToLine />
        </button>

        <button
          className="cursor-pointer"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft />
        </button>

        {getPageRange().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`cursor-pointer ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ))}

        <button
          className="cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRight />
        </button>

        <button
          className="cursor-pointer"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ArrowRightToLine />
        </button>
      </div>

      <div className="flex flex-row text-xl items-center justify-center">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
