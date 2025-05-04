import React from "react";

interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={"page-item" + (page === currentPage ? " active" : "")}
              key={"page_" + page}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
