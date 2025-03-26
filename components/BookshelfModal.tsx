"use client";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/useAuthStore";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { Book, BookCategoryFilterKey } from "@/types/bookAppTypes";

import { useEffect, useState } from "react";
import { BiSolidBookHeart } from "react-icons/bi";
import { FaRegStar, FaStar } from "react-icons/fa6";
import DatePicker from "./DatePicker";

export type BookshelfModalProps = {
    book: Book;
};

const BOOK_CATEGORIES: { key: BookCategoryFilterKey; label: string }[] = [
    { key: "wantToRead", label: "Want to Read" },
    { key: "reading", label: "Currently Reading" },
    { key: "read", label: "Have Read" },
    { key: "readAgain", label: "Read Again" },
];

const BookshelfModal = ({ book }: BookshelfModalProps) => {
    const { addBook, isLoading, books } = useBookshelfStore();
    const { user } = useAuthStore();
    const [filters, setFilters] = useState<
        Record<BookCategoryFilterKey, boolean>
    >({
        wantToRead: false,
        reading: false,
        read: false,
        readAgain: false,
        addedNoFlag: false,
    });
    const [addedNoFlag, setAddedNoFlag] = useState<boolean>(false);
    const [rating, setRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [categories, setCategories] = useState<string[]>(
        book.categories ?? []
    );
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false); // Control modal open/close

    // Load existing book data when modal opens
    useEffect(() => {
        if (!isOpen || !user) return;

        // Find the book in the user's bookshelf
        const userBook = books.find((b) => b.id === book.id);

        if (userBook) {
            // Set filters based on existing book data
            setFilters({
                wantToRead: userBook.wantToRead || false,
                reading: userBook.reading || false,
                read: userBook.read || false,
                readAgain: userBook.readAgain || false,
                addedNoFlag: userBook.addedNoFlag || false,
            });

            // Set rating from existing book data
            setRating(userBook.rating || null);

            // Set categories from existing book data
            setCategories(userBook.categories || []);

            // Set start date if available
            setStartDate(
                userBook.startDate ? new Date(userBook.startDate) : null
            );
        }
    }, [isOpen, user, book.id, books]);

    const toggleFilter = (key: BookCategoryFilterKey) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Handle rating change
    const handleRatingChange = (newRating: number) => {
        // If clicking the same star again, toggle it off
        if (rating === newRating) {
            setRating(null);
        } else {
            setRating(newRating);
        }
    };

    const handleAddToBookshelf = async () => {
        if (!user) return;

        const hasNoFlag = !Object.values(filters).some((v) => v);

        if (hasNoFlag) {
            setAddedNoFlag(true);
        }

        const newBook: Book = {
            id: book.id,
            title: book.title,
            authors: book.authors ?? null,
            publishedDate: book.publishedDate || null,
            description: book.description || null,
            pageCount: book.pageCount || null,
            categories: categories.length > 0 ? categories : null,
            averageRating: book.averageRating ?? null,
            imgUrl: book.imgUrl || null,
            ...filters,
            addedNoFlag: hasNoFlag,
            rating, // This will save the rating to the database
            startDate: filters.reading ? startDate?.toISOString() : null,
        };

        await addBook(newBook);
        setIsOpen(false); // Close the modal after adding the book
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button
                    className="mb-6 tooltip tooltip-left tooltip-primary w-[44px] h-[44px]"
                    data-tip="Add to Bookshelf"
                    disabled={isLoading}
                >
                    <BiSolidBookHeart className="min-h-8 min-w-8" />
                </button>
            </DialogTrigger>

            <DialogContent
                className="bg-accent-light text-base-dark border p-8 border-none rounded-lg max-w-md w-full"
                onInteractOutside={(e) => e.preventDefault()} // Prevent closing when clicking outside
                onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on escape key
            >
                <DialogHeader>
                    <DialogTitle className="leading-relaxed text-left">
                        Add "{book.title}" to Bookshelf
                    </DialogTitle>
                </DialogHeader>

                <div className="py-1 flex flex-col gap-4">
                    {BOOK_CATEGORIES.map(({ key, label }) => (
                        <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                                id={key}
                                checked={filters[key]}
                                onCheckedChange={() => toggleFilter(key)}
                            />
                            <label
                                htmlFor={key}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {label}
                            </label>
                        </div>
                    ))}

                    {filters.reading && (
                        <div className="mt-4">
                            <label className="block mb-2 font-semibold">
                                Started Reading:
                            </label>
                            <DatePicker
                                date={startDate}
                                setDate={setStartDate}
                            />
                        </div>
                    )}

                    <label className="mt-4 flex items-center gap-2">
                        <span className="block font-semibold">Rating:</span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => {
                                // Determine if star should be filled
                                const filled =
                                    (hoverRating !== null &&
                                        star <= hoverRating) ||
                                    (hoverRating === null &&
                                        rating !== null &&
                                        star <= rating);

                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        onMouseEnter={() =>
                                            setHoverRating(star)
                                        }
                                        onMouseLeave={() =>
                                            setHoverRating(null)
                                        }
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

                    <label className="block mt-4">
                        Categories (comma separated):
                        <input
                            type="text"
                            value={categories?.join(", ") || ""}
                            onChange={(e) =>
                                setCategories(
                                    e.target.value
                                        .split(",")
                                        .map((cat) => cat.trim())
                                        .filter((cat) => cat.length > 0)
                                )
                            }
                            className="input input-bordered w-full mt-1"
                        />
                    </label>
                </div>

                <div className="flex justify-between gap-2 mt-6">
                    <button
                        className="px-4 py-2 border-2 border-accent-accent rounded-md shadow-md hover:border-accent-soft hover:bg-accent-soft"
                        onClick={() => setIsOpen(false)}
                        disabled={isLoading}
                    >
                        Close
                    </button>
                    <button
                        className="text-base-dark text-center px-4 py-2 bg-accent-accent hover:bg-accent-soft inset-12 rounded-md shadow-md"
                        onClick={handleAddToBookshelf}
                        disabled={isLoading}
                    >
                        {isLoading ? "Adding..." : "Add to Bookshelf"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookshelfModal;
