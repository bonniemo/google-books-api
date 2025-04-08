import { adminAuth, adminDb } from "@/app/firebase/admin-config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    context: { params: { userId: string; bookId: string } }
) {
    try {
        const { userId, bookId } = context.params;
        const sessionCookie = (await cookies()).get("session")?.value;

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
        if (decodedClaims.uid !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

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
        const { userId, bookId } = context.params;
        const sessionCookie = (await cookies()).get("session")?.value;

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
        if (decodedClaims.uid !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedData = await request.json();
        const dataWithTimestamp = {
            ...updatedData,
            updatedAt: new Date().toISOString(),
        };

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
