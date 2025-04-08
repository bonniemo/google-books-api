"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GetBookFromUrl = () => {
    const params = useParams();
    const router = useRouter();
    const books = useBookshelfStore((state) => state.books);
    const loadBooks = useBookshelfStore((state) => state.loadBooks);
    const currentBook = useBookshelfStore((state) => state.currentBook);
    const setCurrentBook = useBookshelfStore((state) => state.setCurrentBook);
    const isLoading = useBookshelfStore((state) => state.isLoading);
    const error = useBookshelfStore((state) => state.error);
    const clearError = useBookshelfStore((state) => state.clearError);
    const [initialLoading, setInitialLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        clearError();
        if (!books || books.length === 0) {
            loadBooks()
                .catch(() => {
                    setShowError(true);
                })
                .finally(() => {
                    setInitialLoading(false);
                });
        } else {
            setInitialLoading(false);
        }
    }, [books.length, loadBooks, clearError]);

    useEffect(() => {
        if (isLoading || !books || books.length === 0) return;

        const { bookId } = params;
        if (!bookId) return;

        const foundBook = books.find((book) => book.id === bookId);
        setCurrentBook(foundBook || null);
    }, [params, books, isLoading, setCurrentBook]);

    if (error && showError && !isLoading && books.length === 0) {
        return (
            <div className="p-4">
                <h1 className="text-xl mb-4 text-red-600">Error</h1>
                <p>{error}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => {
                        clearError();
                        setShowError(false);
                        router.push("/book-corner");
                    }}
                >
                    Return to Bookshelf
                </button>
            </div>
        );
    }

    if (!currentBook && !initialLoading && !isLoading) {
        return (
            <div className="p-4">
                <h1 className="text-xl mb-4">Book not found</h1>
                <p>Could not find the requested book in your bookshelf.</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => router.push("/book-corner")}
                >
                    Return to Bookshelf
                </button>
            </div>
        );
    }

    return null;
};

export default GetBookFromUrl;
