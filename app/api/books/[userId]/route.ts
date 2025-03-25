import { adminAuth, adminDb } from "@/app/firebase/admin-config";
import { Book } from "@/types/bookAppTypes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// GET all books for a user
export async function GET(
    request: NextRequest,
    context: { params: { userId: string | string[] } }
) {
    try {
        // Ensure params are properly awaited by destructuring after await
        const { userId } = await Promise.resolve(context.params);

        // Verify session user
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const decodedClaims = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );
        const sessionUser = {
            uid: decodedClaims.uid,
            email: decodedClaims.email || "",
            name: decodedClaims.name || "",
        };

        // Ensure userId is a string
        const userIdString = Array.isArray(userId) ? userId[0] : userId;

        // Only allow users to access their own data
        if (sessionUser.uid !== userIdString) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Get user's books from Firestore
        const booksSnapshot = await adminDb
            .collection("users")
            .doc(userIdString)
            .collection("books")
            .get();

        const books: Book[] = [];
        booksSnapshot.forEach((doc) => {
            books.push(doc.data() as Book);
        });

        return NextResponse.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json(
            { error: "Failed to fetch books" },
            { status: 500 }
        );
    }
}

// POST a new book
export async function POST(
    request: NextRequest,
    context: { params: { userId: string | string[] } }
) {
    try {
        // Ensure params are properly awaited by destructuring after await
        const { userId } = await Promise.resolve(context.params);

        // Verify session user
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const decodedClaims = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );
        const sessionUser = {
            uid: decodedClaims.uid,
            email: decodedClaims.email || "",
            name: decodedClaims.name || "",
        };

        // Ensure userId is a string
        const userIdString = Array.isArray(userId) ? userId[0] : userId;

        // Only allow users to access their own data
        if (sessionUser.uid !== userIdString) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const book: Book = await request.json();

        // Validate book data
        if (!book.id || !book.title) {
            return NextResponse.json(
                { error: "Book ID and title are required" },
                { status: 400 }
            );
        }

        // Add creation timestamp
        const bookWithTimestamp = {
            ...book,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Save to Firestore
        await adminDb
            .collection("users")
            .doc(userIdString)
            .collection("books")
            .doc(book.id)
            .set(bookWithTimestamp);

        return NextResponse.json(
            { message: "Book added successfully", book: bookWithTimestamp },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding book:", error);
        return NextResponse.json(
            { error: "Failed to add book" },
            { status: 500 }
        );
    }
}
