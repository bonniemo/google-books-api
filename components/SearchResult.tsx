import DisplayCardSearchResult from "@/components/DisplayCardSearchResult";
import {
    GoogleBooksSearchResponse,
    GoogleBookVolume,
} from "../types/google-book-search-types";

interface SearchResultProps {
    result: GoogleBooksSearchResponse | null;
    searchAttempted: boolean;
    searchQuery: string | null;
}

const SearchResult = ({
    result,
    searchAttempted,
    searchQuery,
}: SearchResultProps) => {
    // Initial state - no search attempted yet
    if (!searchAttempted) {
        return (
            <div className="flex flex-col mt-16 ">
                <h2 className="text-2xl font-semibold mb-3">
                    Welcome to Book Search
                </h2>
                <p className=" max-w-lg">
                    Search for your favorite books above to discover information
                    about titles, authors, descriptions, and more.
                </p>
            </div>
        );
    }

    // Search attempted but no results
    if (!result || !result.items || result.items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-16 ">
                <h2 className="text-xl font-semibold mb-3">No books found</h2>
                <p className=" max-w-lg">
                    We couldn't find any books matching "{searchQuery}". Please
                    try a different search term or check your spelling.
                </p>
            </div>
        );
    }

    // Search with results
    return (
        <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">
                Found {result.items.length} books for "{searchQuery}"
            </h2>
            <div className="flex flex-wrap gap-10">
                {result.items.map((book: GoogleBookVolume) => {
                    return (
                        <DisplayCardSearchResult
                            key={book.id}
                            id={book.id || ""}
                            imgUrl={
                                book.volumeInfo?.imageLinks?.thumbnail || ""
                            }
                            title={book.volumeInfo?.title || "Untitled"}
                            authors={book.volumeInfo?.authors || undefined}
                            publishedDate={
                                book.volumeInfo?.publishedDate || undefined
                            }
                            description={
                                book.volumeInfo?.description || undefined
                            }
                            pageCount={book.volumeInfo?.pageCount ?? undefined}
                            categories={
                                book.volumeInfo?.categories || undefined
                            }
                            averageRating={
                                book.volumeInfo?.averageRating ?? undefined
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SearchResult;
