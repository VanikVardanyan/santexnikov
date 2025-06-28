"use client";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1; // react-paginate использует 0-based индексы
    onPageChange(newPage);
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <ReactPaginate
        previousLabel={
          <span className="flex items-center">
            <i className="bi bi-chevron-left"></i>
            <span className="ml-1">Предыдущая</span>
          </span>
        }
        nextLabel={
          <span className="flex items-center">
            <span className="mr-1">Следующая</span>
            <i className="bi bi-chevron-right"></i>
          </span>
        }
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1} // react-paginate использует 0-based индексы
        containerClassName="flex items-center space-x-1"
        pageClassName="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        pageLinkClassName="block"
        activeClassName="bg-blue-600 text-white"
        activeLinkClassName="block"
        previousClassName="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        previousLinkClassName="block"
        nextClassName="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        nextLinkClassName="block"
        breakClassName="px-3 py-2 text-sm text-gray-500"
        breakLinkClassName="block"
        disabledClassName="text-gray-400 cursor-not-allowed"
        disabledLinkClassName="block"
      />
    </div>
  );
}
