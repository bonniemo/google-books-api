import { adminAuth, adminDb } from "@/app/firebase/admin-config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// DELETE a book
export async function DELETE(
    request: Request,
    context: { params: { userId: string; bookId: string } }
) {
    try {
        // Await the params
        const params = await context.params;
        const userId = params.userId;
        const bookId = params.bookId;

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

        // Only allow users to access their own data
        if (sessionUser.uid !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Check if book exists
        const bookDoc = await adminDb
            .collection("users")
            .doc(userId)
            .collection("books")
            .doc(bookId)
            .get();

        if (!bookDoc.exists) {
            return NextResponse.json(
                { error: "Book not found" },
                { status: 404 }
            );
        }

        // Delete from Firestore
        await adminDb
            .collection("users")
            .doc(userId)
            .collection("books")
            .doc(bookId)
            .delete();

        return NextResponse.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        return NextResponse.json(
            { error: "Failed to delete book" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    context: { params: { userId: string; bookId: string } }
) {
    try {
        // Await the params
        const params = await context.params;
        const userId = params.userId;
        const bookId = params.bookId;

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

        // Only allow users to access their own data
        if (sessionUser.uid !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Check if book exists
        const bookDoc = await adminDb
            .collection("users")
            .doc(userId)
            .collection("books")
            .doc(bookId)
            .get();

        if (!bookDoc.exists) {
            return NextResponse.json(
                { error: "Book not found" },
                { status: 404 }
            );
        }

        // Get update data from request
        const updatedData = await request.json();

        // Add timestamp
        const dataWithTimestamp = {
            ...updatedData,
            updatedAt: new Date().toISOString(),
        };

        // Update in Firestore
        await adminDb
            .collection("users")
            .doc(userId)
            .collection("books")
            .doc(bookId)
            .update(dataWithTimestamp);

        return NextResponse.json({
            message: "Book updated successfully",
            updates: dataWithTimestamp,
        });
    } catch (error) {
        console.error("Error updating book:", error);
        return NextResponse.json(
            { error: "Failed to update book" },
            { status: 500 }
        );
    }
}
