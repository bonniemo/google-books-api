"use server";

import { GoogleBooksSearchResponse } from "@/types/google-book-search-types";

export async function getGoogleBooks({
    query,
}: {
    query: string;
}): Promise<GoogleBooksSearchResponse> {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const lang = "en";
    const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=${lang}`;

    try {
        const res = await fetch(googleBooksApiUrl);
        if (!res.ok) {
            throw new Error("Failed to fetch books");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw new Error("Error fetching books");
    }
}
