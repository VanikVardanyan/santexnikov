"use client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { SxProps } from "@mui/material";

interface AdvancedPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  className?: string;
  showItemsPerPage?: boolean;
  showInfo?: boolean;
}

const paginationSx: SxProps = {
  "& .MuiPagination-ul": {
    justifyContent: "center",
    gap: "2px",
  },
  "& .MuiPaginationItem-root": {
    minWidth: 32,
    height: 32,
    fontWeight: 700,
    fontSize: "1.1rem",
    borderRadius: "50%",
    transition: "all 0.15s",
    margin: "0 2px",
    boxShadow: "none",
    color: "#15577a",
    "&:hover": {
      backgroundColor: "#f2f7fa",
      color: "#0090ff",
    },
    "&.Mui-selected": {
      backgroundColor: "#0090ff",
      color: "#fff",
      boxShadow: "0 2px 8px 0 rgba(0,144,255,0.07)",
      border: "none",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#0077cc",
    },
    "&.MuiPaginationItem-ellipsis": {
      color: "#8bb0c7",
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
  "& .MuiPaginationItem-previousNext": {
    borderRadius: "50%",
    fontSize: "1.3rem",
    color: "#15577a",
    minWidth: 32,
    height: 32,
    "&:hover": {
      backgroundColor: "#eaf6ff",
      color: "#0090ff",
    },
  },
};

export default function AdvancedPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  className = "",
  showItemsPerPage = true,
  showInfo = true,
}: AdvancedPaginationProps) {
  const [localItemsPerPage, setLocalItemsPerPage] = useState(itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setLocalItemsPerPage(newItemsPerPage);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Info and Items per page */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        {showInfo && (
          <div className="text-sm text-gray-600">
            Показано {startItem}-{endItem} из {totalItems} товаров
          </div>
        )}

        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Товаров на странице:</span>
            <select
              value={localItemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="form-select form-select-sm w-auto"
              style={{ minWidth: 48, height: 32, fontSize: "1rem", padding: "2px 8px", borderRadius: 8 }}
            >
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Stack spacing={1}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="circular"
            siblingCount={1}
            boundaryCount={1}
            size="small"
            sx={paginationSx}
            hidePrevButton={false}
            hideNextButton={false}
            showFirstButton={false}
            showLastButton={false}
          />
        </Stack>
      </div>

      {/* Page info */}
      {showInfo && (
        <div className="text-center text-sm text-gray-500">
          Страница {currentPage} из {totalPages}
        </div>
      )}
    </div>
  );
}
