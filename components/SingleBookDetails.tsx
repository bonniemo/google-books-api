import useBookshelfStore from "@/stores/useBookshelfStore";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { DatePicker } from "./DatePicker";
import RadioButtons from "./RadioButtons";
import UserNotes from "./UserNotes";

type NoteType = "quote" | "reflection" | "memorable";

const SingleBookDetails = () => {
    const { currentBook, loadBooks, books, updateBook } = useBookshelfStore();
    const [rating, setRating] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] =
        useState<NoteType>("reflection");

    const radioOptions: Array<{ label: string; value: NoteType }> = [
        { label: "Reflections", value: "reflection" },
        { label: "Quotes", value: "quote" },
        { label: "Memorables", value: "memorable" },
    ];

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
                <div className="mt-2 flex gap-6">
                    <div>
                        <label className="block mb-2 font-semibold">
                            Started Reading:
                        </label>
                        <DatePicker date={startDate} setDate={setStartDate} />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">
                            Finished Reading:
                        </label>
                        <DatePicker date={finishDate} setDate={setFinishDate} />
                    </div>
                </div>

                <label className="flex items-center gap-1 mt-4">
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
            </section>

            <h1 className="text-lg font-bold mt-8 mb-2">Choose an Option</h1>
            <RadioButtons<"quote" | "reflection" | "memorable">
                options={radioOptions}
                name="my-radio"
                value={selectedOption}
                onChange={setSelectedOption}
            />

            <UserNotes
                book={book}
                loadBooks={loadBooks}
                type={selectedOption}
            />
        </>
    );
};

export default SingleBookDetails;
