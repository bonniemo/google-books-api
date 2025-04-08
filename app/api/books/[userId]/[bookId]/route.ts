import { adminAuth, adminDb } from "@/app/firebase/admin-config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function verifyAuth(userId: string) {
    const sessionCookie = (await cookies()).get("session")?.value;

    if (!sessionCookie) {
        return { isAuthenticated: false, error: "Unauthorized" };
    }

    const decodedClaims = await adminAuth.verifySessionCookie(
        sessionCookie,
        true
    );
    if (decodedClaims.uid !== userId) {
        return { isAuthenticated: false, error: "Forbidden" };
    }

    return { isAuthenticated: true };
}

export async function DELETE(
    request: Request,
    context: { params: { userId: string; bookId: string } }
) {
    try {
        const params = await context.params;
        const { userId, bookId } = params;

        const auth = await verifyAuth(userId);
        if (!auth.isAuthenticated || auth.error) {
            return NextResponse.json(
                { error: auth.error },
                { status: auth.error === "Forbidden" ? 403 : 401 }
            );
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
        const params = await context.params;
        const { userId, bookId } = params;

        const auth = await verifyAuth(userId);
        if (!auth.isAuthenticated || auth.error) {
            return NextResponse.json(
                { error: auth.error },
                { status: auth.error === "Forbidden" ? 403 : 401 }
            );
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
