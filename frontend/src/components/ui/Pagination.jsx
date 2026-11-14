import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages } = pagination;

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages} &middot; {pagination.total} total
      </p>
      <div className="flex gap-2">
        <button
          className="btn-secondary px-2 py-1"
          disabled={!pagination.hasPrevPage}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className="btn-secondary px-2 py-1"
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
