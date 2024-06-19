import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  console.log(currentPage);
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination">
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "active" : ""}
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
