import { Images } from "@/public/assets";
import Image from "next/image";

interface PaginationProps {
  total: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, total);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 9) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="flex justify-between items-center gap-2 mt-7">
      <p className="text-sm text-gray-500">
        Showing {startIndex} to {endIndex} of {total} entries
      </p>

      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Image src={Images.left_icon} width={8} height={12} alt="left_icon" />
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <div
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-gray-400"
            >
              {page}
            </div>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`w-8 h-8 flex items-center cursor-pointer justify-center rounded-lg font-small transition-all ${
                currentPage === page
                  ? "bg-[#5932EA] text-white shadow-md"
                  : "bg-[#F5F5F5] text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Image
            src={Images.right_arrow_pagination}
            width={8}
            height={12}
            alt="right_arrow"
          />
        </button>
      </div>
    </div>
  );
};
