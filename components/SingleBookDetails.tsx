import useBookshelfStore from "@/stores/useBookshelfStore";
import { formatDate } from "@/utils/utils";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import UserNotes from "./UserNotes";

const SingleBookDetails = () => {
    const { currentBook, loadBooks, books, updateBook } = useBookshelfStore();
    const [rating, setRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    const book =
        books.find((book) => book.id === currentBook?.id) || currentBook;

    useEffect(() => {
        if (book?.rating) {
            setRating(book.rating);
        }
    }, [book]);

    if (!book) {
        return null;
    }

    const handleRatingChange = async (newRating: number) => {
        const updatedRating = rating === newRating ? null : newRating;
        setRating(updatedRating);

        await updateBook(book.id, { rating: updatedRating });
    };

    return (
        <>
            <section className="text-sm">
                <img
                    src={book.imgUrl || ""}
                    alt={`Book cover of ${book.title}`}
                    className="h-72 object-contain object-center rounded"
                />
                <h1 className="text-2xl font-bold mt-2">
                    {book.title}
                    {book.authors && book.authors.length > 0 && (
                        <span className="font-normal text-lg">
                            {" "}
                            by {book.authors.join(", ")}
                        </span>
                    )}
                </h1>
                {book.publishedDate && <p>Published: {book.publishedDate}</p>}
                {book.categories && (
                    <p>Categories: {book.categories.join(", ")}</p>
                )}
                {book.pageCount && <p>Pages: {book.pageCount}</p>}
                <label className="flex items-center gap-1">
                    <span>Rating:</span>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const filled =
                                (hoverRating !== null && star <= hoverRating) ||
                                (hoverRating === null &&
                                    rating !== null &&
                                    star <= rating);

                            return (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingChange(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(null)}
                                    className="text-accent-accent hover:scale-110 transition-transform mt-1"
                                    aria-label={`Rate ${star} stars`}
                                >
                                    {filled ? (
                                        <FaStar className="w-6 h-6" />
                                    ) : (
                                        <FaRegStar className="w-6 h-6" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </label>
                {book.startDate && (
                    <p>Started reading: {formatDate(book.startDate)}</p>
                )}
                {book.finishDate && <p>Finished reading {book.finishDate}</p>}
            </section>

            <section className="mt-8 space-y-20">
                <UserNotes
                    book={book}
                    loadBooks={loadBooks}
                    type="reflection"
                />

                <UserNotes book={book} loadBooks={loadBooks} type="quote" />
                <UserNotes book={book} loadBooks={loadBooks} type="memorable" />
            </section>
        </>
    );
};

export default SingleBookDetails;
