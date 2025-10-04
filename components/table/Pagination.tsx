import { Images } from "@/public/assets";
import { Customer } from "@/types/customer";
import Image from "next/image";

export const Pagination = ({
  customers,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}: {
  customers: Customer[];
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex  justify-between items-center gap-2 mt-7">
      <p className="text-sm text-gray-500">
        Showing data 1 to 8 of {customers.length} entries
      </p>

      {/* Previous Button */}
      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Image src={Images.left_icon} width={8} height={12} alt="left_icon" />
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <div
                key={`ellipsis-${index}`}
                className="w-8 h-8 flex items-center justify-center text-gray-400"
              >
                {page}
              </div>
            );
          }

          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg font-small transition-all ${
                currentPage === page
                  ? "bg-[#5932EA] text-white shadow-md"
                  : "bg-[#F5F5F5] text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
