import useBookshelfStore from "@/stores/useBookshelfStore";

import { useEffect, useState } from "react";
import noCoverImg from "../../public/no-cover.png";
import { DatePicker } from "../DatePicker";
import StarRating from "../StarRating";
import RadioButtons from "./RadioButtons";
import UserNotes from "./UserNotes";

type NoteType = "quote" | "reflection" | "memorable";

const SingleBookDetails = () => {
    const currentBook = useBookshelfStore((state) => state.currentBook);
    const loadBooks = useBookshelfStore((state) => state.loadBooks);
    const books = useBookshelfStore((state) => state.books);
    const updateBook = useBookshelfStore((state) => state.updateBook);
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
    }, []);

    const book =
        books.find((book) => book.id === currentBook?.id) || currentBook;

    useEffect(() => {
        if (book?.rating) {
            setRating(book.rating);
        }

        if (book?.startDate) {
            console.log(book.startDate);
        }
        if (book?.finishDate) {
            console.log(book.finishDate);
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

    const changeStartDate = async (newDate: Date | null) => {
        setStartDate(newDate);
        // Convert Date to string for database storage
        await updateBook(book.id, { startDate: newDate });
    };

    const changeFinishDate = async (newDate: Date | null) => {
        setFinishDate(newDate);
        // Convert Date to string for database storage
        await updateBook(book.id, { finishDate: newDate });
    };

    return (
        <>
            <section className="text-base sm:text-lg sm:grid sm:grid-cols-[auto_1fr] gap-8 mt-8">
                <img
                    src={book.imgUrl ? book.imgUrl : noCoverImg.src}
                    alt={`Book cover of ${book.title}`}
                    className="h-72 object-contain object-center rounded"
                />
                <div className="space-y-8 mt-6 sm:mt-0">
                    <div>
                        <h1 className="text-2xl font-bold mt-2 ">
                            {book.title}
                            {book.authors && book.authors.length > 0 && (
                                <span className="font-normal text-lg">
                                    {" "}
                                    by {book.authors.join(", ")}
                                </span>
                            )}
                        </h1>
                        {book.publishedDate && (
                            <p>Published: {book.publishedDate}</p>
                        )}
                        {book.categories && (
                            <p>Categories: {book.categories.join(", ")}</p>
                        )}
                        {book.pageCount && <p>Pages: {book.pageCount}</p>}
                    </div>
                    <div className="mt-2 flex gap-6">
                        <div>
                            <label className="block mb-2 font-semibold">
                                Started Reading:
                            </label>
                            <DatePicker
                                date={startDate}
                                setDate={changeStartDate}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                Finished Reading:
                            </label>
                            <DatePicker
                                date={finishDate}
                                setDate={changeFinishDate}
                            />
                        </div>
                    </div>
                    <StarRating
                        rating={rating}
                        onRatingChange={handleRatingChange}
                    />
                </div>
            </section>

            <div className="mt-8 flex gap-4 items-center">
                <h1 className="text-lg font-bold">Display:</h1>
                <RadioButtons
                    value={selectedOption}
                    onChange={setSelectedOption}
                />
            </div>

            <div className="mt-4">
                <UserNotes
                    book={book}
                    loadBooks={loadBooks}
                    type={selectedOption}
                />
            </div>
        </>
    );
};

export default SingleBookDetails;
