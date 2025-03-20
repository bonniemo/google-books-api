import useBookshelfStore from "@/stores/useBookshelfStore";
import UserBookNotesModal from "./UserBookNotesModal";

const SingleBookDetails = () => {
    const { currentBook } = useBookshelfStore();
    if (!currentBook) {
        return;
    }

    const book = currentBook;

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
                    <p className="text-sm">Started reading {book.startDate}</p>
                )}
                {book.finishDate && (
                    <p className="text-sm">
                        Finished reading {book.finishDate}
                    </p>
                )}
            </section>
            <section>
                <h3 className="mb-3">Reflections</h3>
                <UserBookNotesModal type="reflection" bookId={book.id} />
                <ul>
                    {book.reflections &&
                        book.reflections.map((reflection, index) => (
                            <li key={index}>{reflection.text}</li>
                        ))}
                </ul>
            </section>
        </>
    );
};

export default SingleBookDetails;
