// tutorial from https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../hooks/usePagination";
import "../pagination.css";

const Pagination = (props) => {
  const siblingCount = 1; // whats next to the current page #
  const pageSize = 25; // default limit for search endpoint
  const { onPageChange, total, currentPage, className } = props; // prop explosion

  const paginationRange = usePagination({
    currentPage,
    total,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  if (total === 0) {
    return null;
  } else {
    return (
      <ul
        className={classnames("pagination-container", {
          [className]: className,
        })}
      >
        {/* Left navigation arrow - if on first page, disable */}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>

        {paginationRange.map((pageNumber) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          // Render Page pills
          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}

        {/* Right navigation arrow - if on last page, disable */}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    );
  }
};

export default Pagination;
