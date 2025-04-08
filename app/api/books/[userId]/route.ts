import { adminAuth, adminDb } from "@/app/firebase/admin-config";
import { Book } from "@/types/bookAppTypes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

async function verifyAuth(userIdString: string) {
    const sessionCookie = (await cookies()).get("session")?.value;

    if (!sessionCookie) {
        return { isAuthenticated: false, error: "Unauthorized" };
    }

    try {
        const decodedClaims = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );
        if (decodedClaims.uid !== userIdString) {
            return { isAuthenticated: false, error: "Forbidden" };
        }
        return { isAuthenticated: true };
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return { isAuthenticated: false, error: "Unauthorized" };
    }
}

export async function GET(
    request: NextRequest,
    context: { params: { userId: string | string[] } }
) {
    try {
        const { userId } = await context.params;
        const userIdString = Array.isArray(userId) ? userId[0] : userId;

        const auth = await verifyAuth(userIdString);
        if (!auth.isAuthenticated || auth.error) {
            return NextResponse.json(
                { error: auth.error },
                { status: auth.error === "Forbidden" ? 403 : 401 }
            );
        }

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

export async function POST(
    request: NextRequest,
    context: { params: { userId: string | string[] } }
) {
    try {
        const { userId } = await context.params;
        const userIdString = Array.isArray(userId) ? userId[0] : userId;

        const auth = await verifyAuth(userIdString);
        if (!auth.isAuthenticated || auth.error) {
            return NextResponse.json(
                { error: auth.error },
                { status: auth.error === "Forbidden" ? 403 : 401 }
            );
        }

        const book: Book = await request.json();

        if (!book.id || !book.title) {
            return NextResponse.json(
                { error: "Book ID and title are required" },
                { status: 400 }
            );
        }

        const bookWithTimestamp = {
            ...book,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

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
