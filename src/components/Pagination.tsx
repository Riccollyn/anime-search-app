import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Search results pages">
  <ul className="pagination justify-content-center app-pagination">
        <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(Math.max(1, currentPage - 1))}>Previous</button>
        </li>
        <li className="page-item disabled"><span className="page-link">Page {currentPage} of {totalPages}</span></li>
        <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;