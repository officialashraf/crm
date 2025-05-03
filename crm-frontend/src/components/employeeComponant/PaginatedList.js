/* eslint-disable no-unused-vars */
import React from "react";
import paginationBasic from "../../assets/style/employecss/paginationBasic.css";

const PaginatedList = ({ currentPage, totalPages, handlePageChange }) => {
  const maxPageNumbers = 5; // Sirf 5 pages show karenge
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  // Agar endPage totalPages tak pohch gaya toh startPage ko adjust karo
  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <p
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className="page-link"
          >
            {"<"}
          </p>
        </li>

        {/* First Page Button */}
        {startPage > 1 && (
          <>
            <li className="page-item">
              <p className="page-link" onClick={() => handlePageChange(1)}>
                1
              </p>
            </li>
            {startPage > 2 && <li className="page-item"><p className="page-link">...</p></li>}
          </>
        )}

        {/* Page Numbers */}
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
            >
              <p className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </p>
            </li>
          );
        })}

        {/* Last Page Button */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <li className="page-item"><p className="page-link">...</p></li>}
            <li className="page-item">
              <p className="page-link" onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </p>
            </li>
          </>
        )}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <p
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            className="page-link"
          >
            {">"}
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default PaginatedList;
