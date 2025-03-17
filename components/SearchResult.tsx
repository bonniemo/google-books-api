import DisplayCardSearchResult from "@/components/DisplayCardSearchResult";
import {
    GoogleBooksSearchResponse,
    GoogleBookVolume,
} from "../types/google-book-search-types";

interface SearchResultProps {
    result: GoogleBooksSearchResponse | null;
}

const SearchResult = ({ result }: SearchResultProps) => {
    if (!result || !result.items || result.items.length === 0) {
        return <div>No items found.</div>;
    }

    return (
        <div className="flex flex-wrap gap-10 mt-16">
            {result.items.map((book: GoogleBookVolume) => {
                return (
                    <DisplayCardSearchResult
                        key={book.id}
                        id={book.id || ""}
                        imgUrl={book.volumeInfo?.imageLinks?.thumbnail || ""}
                        title={book.volumeInfo?.title || "Untitled"}
                        authors={book.volumeInfo?.authors || undefined}
                        publishedDate={
                            book.volumeInfo?.publishedDate || undefined
                        }
                        description={book.volumeInfo?.description || undefined}
                        pageCount={book.volumeInfo?.pageCount ?? undefined}
                        categories={book.volumeInfo?.categories || undefined}
                        averageRating={
                            book.volumeInfo?.averageRating ?? undefined
                        }
                    />
                );
            })}
        </div>
    );
};

export default SearchResult;
