import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface PaginationProps<T> {
    data: PaginationData<T>;
}

export function Pagination<T>({ data }: PaginationProps<T>) {
    const { current_page, last_page, from, to, total, links } = data;

    // Don't show pagination if only one page
    if (last_page <= 1) return null;

    // Calculate which page numbers to show (max 5 pages)
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;
        
        if (last_page <= maxVisible) {
            // Show all pages if total is less than max
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            // Calculate range around current page
            let start = Math.max(2, current_page - 1);
            let end = Math.min(last_page - 1, current_page + 1);
            
            // Adjust range to always show 5 pages when possible
            if (current_page <= 3) {
                end = 4;
            } else if (current_page >= last_page - 2) {
                start = last_page - 3;
            }
            
            // Add ellipsis before if needed
            if (start > 2) {
                pages.push('...');
            }
            
            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            // Add ellipsis after if needed
            if (end < last_page - 1) {
                pages.push('...');
            }
            
            // Always show last page
            pages.push(last_page);
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();
    const firstPageLink = links.find(link => link.label === '&laquo; Previous')?.url;
    const lastPageLink = links.find(link => link.label === 'Next &raquo;')?.url;

    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex items-center gap-2">
                {/* First Page */}
                <Link
                    href={firstPageLink || '#'}
                    preserveState
                    preserveScroll
                    className={!data.prev_page_url ? 'pointer-events-none opacity-50' : ''}
                >
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!data.prev_page_url}
                        className="h-9 w-9"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                </Link>

                {/* Previous Page */}
                <Link
                    href={data.prev_page_url || '#'}
                    preserveState
                    preserveScroll
                    className={!data.prev_page_url ? 'pointer-events-none opacity-50' : ''}
                >
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!data.prev_page_url}
                        className="h-9 w-9"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                                ...
                            </span>
                        );
                    }

                    const pageNumber = page as number;
                    const pageLink = links.find(link => {
                        const match = link.label.match(/^\d+$/);
                        return match && parseInt(match[0]) === pageNumber;
                    });

                    return (
                        <Link
                            key={pageNumber}
                            href={pageLink?.url || '#'}
                            preserveState
                            preserveScroll
                        >
                            <Button
                                variant={current_page === pageNumber ? 'default' : 'outline'}
                                size="icon"
                                className="h-9 w-9"
                            >
                                {pageNumber}
                            </Button>
                        </Link>
                    );
                })}

                {/* Next Page */}
                <Link
                    href={data.next_page_url || '#'}
                    preserveState
                    preserveScroll
                    className={!data.next_page_url ? 'pointer-events-none opacity-50' : ''}
                >
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!data.next_page_url}
                        className="h-9 w-9"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </Link>

                {/* Last Page */}
                <Link
                    href={lastPageLink || '#'}
                    preserveState
                    preserveScroll
                    className={!data.next_page_url ? 'pointer-events-none opacity-50' : ''}
                >
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!data.next_page_url}
                        className="h-9 w-9"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            {/* Results info */}
            <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{from}</span> to{' '}
                <span className="font-medium">{to}</span> of{' '}
                <span className="font-medium">{total}</span> results
            </p>
        </div>
    );
}
