import React from 'react'
import paginationBasic from "../../assets/style/employecss/paginationBasic.css";



const AdminPagination = ({currentPage,totalPages,handlePageChange}) => {
  return (
    <>
     <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <p
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              className="page-link"
            >
              {"<"}
            </p>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <p
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </p>
            </li>
          ))}
          <li className="page-item">
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
    </>
  )
}

export default AdminPagination