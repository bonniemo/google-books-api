import useBookshelfStore from "@/stores/useBookshelfStore";

import { formatDate } from "@/utils/utils";
import { useEffect } from "react";
import UserBookNotesModal from "./UserBookNotesModal";

const SingleBookDetails = () => {
    const { currentBook, loadBooks, books } = useBookshelfStore();

    // Refresh data when component mounts or after updates
    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    if (!currentBook) {
        return null;
    }

    // Find the most up-to-date version of this book from the refreshed books array
    const book = books.find((b) => b.id === currentBook.id) || currentBook;

    return (
        <>
            <section className="p-4">
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
                {book.publishedDate && (
                    <p className="text-sm">Published: {book.publishedDate}</p>
                )}
                {book.categories && (
                    <p className="text-sm">
                        Categories: {book.categories.join(", ")}
                    </p>
                )}
                {book.pageCount && (
                    <p className="text-sm">Pages: {book.pageCount}</p>
                )}
                {book.averageRating && (
                    <p className="text-sm">Rating: {book.averageRating} / 5</p>
                )}
                {book.rating && (
                    <p className="text-sm">Rating: {book.rating} / 5</p>
                )}
                {book.startDate && (
                    <p className="text-sm">
                        Started reading: {formatDate(book.startDate)}
                    </p>
                )}
                {book.finishDate && (
                    <p className="text-sm">
                        Finished reading {book.finishDate}
                    </p>
                )}
            </section>
            <section className="mt-10">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl">Reflections</h3>
                    <UserBookNotesModal
                        type="reflection"
                        bookId={book.id}
                        onSaved={() => loadBooks()}
                    />
                </div>
                <ul className="mt-8 space-y-4">
                    {book.reflections && book.reflections.length > 0 ? (
                        book.reflections.map((reflection, index) => (
                            <li
                                key={index}
                                className="p-2 rounded bg-card-bg text-card-text"
                            >
                                {reflection.text}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500 italic">
                            No reflections yet
                        </li>
                    )}
                </ul>
            </section>
        </>
    );
};

export default SingleBookDetails;
