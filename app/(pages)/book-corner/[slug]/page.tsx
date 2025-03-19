"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { Book } from "@/types/google-book-search-types";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleBookPage = () => {
    const { books } = useBookshelfStore();
    const params = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const slug = params?.slug as string;
        if (slug) {
            // Decode URL-encoded characters
            const decodedSlug = decodeURIComponent(slug);

            const foundBook = books.find((book) => {
                if (!book.title) return false;

                // Generate a slug from the book title the same way you do when creating URLs
                const bookSlug = book.title.toLowerCase().replace(/\s+/g, "-");

                // Compare the URL slug with the generated book slug
                return bookSlug === decodedSlug || book.id === decodedSlug;
            });

            setBook(foundBook || null);
        }
    }, [params, books]);

    if (!book) {
        return (
            <div className="p-4">
                <h1 className="text-xl mb-4">Book not found</h1>
                <p>Could not find the requested book in your bookshelf.</p>
                <p className="mt-2">Requested URL: {params?.slug}</p>
                <p className="mt-4">Available books:</p>
                <ul className="list-disc ml-6 mt-2">
                    {books.map((book) => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <>
            <section>
                <h1>
                    {book.title}
                    {book.authors && book.authors.length > 0 && (
                        <span> by {book.authors.join(", ")}</span>
                    )}
                </h1>
            </section>
        </>
    );
};

export default SingleBookPage;
