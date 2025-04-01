"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Convert title to URL slug
const titleToSlug = (title: string) => {
    if (!title) return "";
    return title
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .trim()
        .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

// Normalize both titles and slugs to a common format for comparison
const normalizeForComparison = (text: string) => {
    if (!text) return "";
    return text.toLowerCase().replace(/[\s-]+/g, ""); // Remove all spaces and hyphens completely
};

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
        // Clear any existing errors when component mounts to prevent error flash
        clearError();

        // Only load books if the books array is empty
        if (!books || books.length === 0) {
            console.log("Loading books from API...");
            loadBooks()
                .catch(() => {
                    // Only show error after we've attempted to load
                    setShowError(true);
                })
                .finally(() => {
                    // Mark initial loading as complete after loadBooks resolves or rejects
                    setInitialLoading(false);
                });
        } else {
            setInitialLoading(false);
        }
    }, [books.length, loadBooks, clearError]);

    // Effect to find the book once books are loaded
    useEffect(() => {
        if (isLoading || !books || books.length === 0) return;

        const slug = params?.slug as string;
        if (!slug) return;

        // Decode URL-encoded characters
        const decodedSlug = decodeURIComponent(slug);

        // Normalize the slug for comparison
        const normalizedSlug = normalizeForComparison(decodedSlug);

        const foundBook = books.find((book) => {
            if (!book.title) return false;

            // Method 1: Direct slug comparison
            const bookSlug = titleToSlug(book.title);

            // Method 2: Normalized comparison (ignoring spaces and hyphens)
            const normalizedTitle = normalizeForComparison(book.title);

            return (
                bookSlug === decodedSlug ||
                normalizedTitle === normalizedSlug ||
                book.id === decodedSlug
            );
        });

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

    // Book not found state - only show if we're not still loading
    if (!currentBook && !initialLoading && !isLoading) {
        return (
            <div className="p-4">
                <h1 className="text-xl mb-4">Book not found</h1>
                <p>Could not find the requested book in your bookshelf.</p>
                <p className="mt-2">Requested URL: {params?.slug}</p>
                <p className="mt-2">
                    Normalized for comparison:{" "}
                    {normalizeForComparison(params?.slug as string)}
                </p>
                <p className="mt-2">Books loaded: {books ? books.length : 0}</p>
                <p className="mt-4">Available books:</p>
                <ul className="list-disc ml-6 mt-2">
                    {books?.map((book) => (
                        <li key={book.id}>
                            <strong>{book.title}</strong>
                            <div className="text-sm text-gray-500">
                                <div>Slug: {titleToSlug(book.title)}</div>
                                <div>
                                    Normalized:{" "}
                                    {normalizeForComparison(book.title)}
                                </div>
                                <div>ID: {book.id}</div>
                            </div>
                        </li>
                    ))}
                </ul>
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
