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
import { Book, BookCategoryFilterKey } from "@/types/google-book-search-types";
import { useState } from "react";
import { FaBook } from "react-icons/fa6";

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
    const { addBook, isLoading } = useBookshelfStore();
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
    const [categories, setCategories] = useState<string[]>(
        book.categories ?? []
    );
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false); // Control modal open/close

    const toggleFilter = (key: BookCategoryFilterKey) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
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
            rating,
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
                    <FaBook className="min-h-8 min-w-6" />
                </button>
            </DialogTrigger>

            <DialogContent className="bg-background text-text border-none">
                <DialogHeader>
                    <DialogTitle>Add "{book.title}" to Bookshelf</DialogTitle>
                </DialogHeader>

                <div className="py-4 flex flex-col gap-4">
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
                            {/* Add a Date Picker Here */}
                        </div>
                    )}

                    <label className="block mt-4">
                        Rating:
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating ?? ""}
                            onChange={(e) =>
                                setRating(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : null
                                )
                            }
                            className="input input-bordered w-full mt-1"
                        />
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

                <div className="flex justify-end gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleAddToBookshelf}
                        disabled={isLoading}
                    >
                        {isLoading ? "Adding..." : "Add to Bookshelf"}
                    </button>
                    <button
                        className="btn"
                        onClick={() => setIsOpen(false)}
                        disabled={isLoading}
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookshelfModal;
