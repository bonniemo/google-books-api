"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { Book } from "@/types/google-book-search-types";
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

const SingleBookPage = () => {
    const params = useParams();
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);

    // Get everything we need from the store
    const { books, loadBooks, isLoading, error, clearError } =
        useBookshelfStore();

    // Effect to load books when component mounts
    useEffect(() => {
        // Clear any existing errors when component mounts to prevent error flash
        clearError();

        // Only load books if the books array is empty
        if (!books || books.length === 0) {
            console.log("Loading books from API...");
            loadBooks().finally(() => {
                // Mark initial loading as complete after loadBooks resolves or rejects
                setInitialLoading(false);
            });
        } else {
            // If we already have books, we're not in initial loading state
            setInitialLoading(false);
        }
    }, [books.length, loadBooks, clearError]);

    // Effect to find the book once books are loaded
    useEffect(() => {
        // Don't try to match if we don't have books yet or if we're still loading
        if (isLoading || !books || books.length === 0) return;

        const slug = params?.slug as string;
        if (!slug) return;

        // Decode URL-encoded characters
        const decodedSlug = decodeURIComponent(slug);

        // Normalize the slug for comparison
        const normalizedSlug = normalizeForComparison(decodedSlug);

        console.log("Searching for book with normalized slug:", normalizedSlug);
        console.log("Available books:", books.length);

        // Try to find the book
        const foundBook = books.find((book) => {
            if (!book.title) return false;

            // Method 1: Direct slug comparison
            const bookSlug = titleToSlug(book.title);

            // Method 2: Normalized comparison (ignoring spaces and hyphens)
            const normalizedTitle = normalizeForComparison(book.title);

            console.log(
                `Comparing: "${normalizedTitle}" with "${normalizedSlug}"`
            );

            return (
                bookSlug === decodedSlug ||
                normalizedTitle === normalizedSlug ||
                book.id === decodedSlug
            );
        });

        if (foundBook) {
            console.log("Found book:", foundBook.title);
        } else {
            console.log("Book not found");
        }

        setBook(foundBook || null);
    }, [params, books, isLoading]);

    // Loading state
    if (initialLoading || isLoading) {
        return (
            <div className="p-4">
                <h1 className="text-xl mb-4">Loading book...</h1>
                <p>Please wait while we retrieve your bookshelf.</p>
            </div>
        );
    }

    // Error state - only show if we're not in initial loading and it's a real error
    if (error && !initialLoading && books.length === 0) {
        return (
            <div className="p-4">
                <h1 className="text-xl mb-4 text-red-600">Error</h1>
                <p>{error}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => {
                        clearError();
                        router.push("/book-corner");
                    }}
                >
                    Return to Bookshelf
                </button>
            </div>
        );
    }

    // Book not found state
    if (!book) {
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

    // Book found state
    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    {book.title}
                    {book.authors && book.authors.length > 0 && (
                        <span className="font-normal text-lg">
                            {" "}
                            by {book.authors.join(", ")}
                        </span>
                    )}
                </h1>
            </section>
        </>
    );
};

export default SingleBookPage;
