"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/stores/useAuthStore";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { BookCategoryFilterKey } from "@/types/bookAppTypes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import BooksCategoryDisplay from "./BooksCategoryDisplay";

const BOOK_CATEGORIES: { key: BookCategoryFilterKey; label: string }[] = [
    { key: "wantToRead", label: "Want to Read" },
    { key: "reading", label: "Currently Reading" },
    { key: "read", label: "Have Read" },
    { key: "readAgain", label: "Read Again" },
    { key: "addedNoFlag", label: "Other Books in Shelf" },
];

const BookshelfDisplay = () => {
    const books = useBookshelfStore((state) => state.books);
    const loadBooks = useBookshelfStore((state) => state.loadBooks);
    const filters = useBookshelfStore((state) => state.filters);
    const toggleFilter = useBookshelfStore((state) => state.toggleFilter);
    const isLoading = useBookshelfStore((state) => state.isLoading);
    const error = useBookshelfStore((state) => state.error);
    const { user } = useAuthStore();
    const router = useRouter();

    const fetchBooks = useCallback(() => {
        if (user) {
            console.log("Loading books...");
            loadBooks();
        } else {
            router.push("/signIn");
        }
    }, [user, loadBooks, router]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // Filter books dynamically based on selected filters
    const categorizedBooks = BOOK_CATEGORIES.reduce((categories, { key }) => {
        categories[key] = books.filter((book) => book[key]);
        return categories;
    }, {} as Record<BookCategoryFilterKey, typeof books>);

    if (!user) return null; // Don't render while redirecting

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 flex justify-center items-center min-h-[50vh]">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            {/* Dynamically render checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
                {BOOK_CATEGORIES.map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-3">
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
            </div>

            {/* Dynamically render category sections */}
            {books.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg mb-4">Your bookshelf is empty</p>
                    <a href="/google-books-search" className="btn btn-primary">
                        Search for books to add
                    </a>
                </div>
            ) : (
                <>
                    {BOOK_CATEGORIES.map(
                        ({ key, label }) =>
                            categorizedBooks[key].length > 0 &&
                            filters[key] && (
                                <BooksCategoryDisplay
                                    key={key}
                                    title={label}
                                    books={categorizedBooks[key]}
                                />
                            )
                    )}
                </>
            )}
        </div>
    );
};

export default BookshelfDisplay;
