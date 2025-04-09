"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GetBookFromUrl = () => {
    const params = useParams();
    const router = useRouter();
    const books = useBookshelfStore((state) => state.books);
    const loadBooks = useBookshelfStore((state) => state.loadBooks);
    const setCurrentBook = useBookshelfStore((state) => state.setCurrentBook);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!books || books.length === 0) {
            loadBooks().catch(() => setIsError(true));
        }
    }, [books, loadBooks]);

    useEffect(() => {
        if (!books || books.length === 0) return;

        const bookId = params?.id as string;
        if (!bookId) return;

        const foundBook = books.find((book) => book.id === bookId);
        setCurrentBook(foundBook || null);
    }, [params, books, setCurrentBook]);

    if (isError) {
        return (
            <div className="p-4">
                <h1 className="text-xl mb-4 text-red-600">
                    Error loading books
                </h1>
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
