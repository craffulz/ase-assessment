import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/players.slice.js";

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
    <div className="pagination">
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        &laquo;
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lsaquo;
      </button>

      {getPageRange().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &rsaquo;
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>

      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
