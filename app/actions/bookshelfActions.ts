import { useAuthStore } from "@/stores/useAuthStore";
import { Book } from "@/types/google-book-search-types";

// Load books for the current user
export const loadBooks = async (set: any) => {
    const user = useAuthStore.getState().user;

    if (!user) {
        set({ error: "You must be logged in to view your bookshelf" });
        return;
    }

    set({ isLoading: true, error: null });

    try {
        const response = await fetch(`/api/books/${user.uid}`);

        if (!response.ok) {
            throw new Error(`Failed to load books: ${response.statusText}`);
        }

        const books: Book[] = await response.json();
        set({ books, isLoading: false });
    } catch (error) {
        console.error("Failed to load books:", error);
        set({
            error:
                error instanceof Error ? error.message : "Failed to load books",
            isLoading: false,
        });
    }
};

// Add a new book
export const addBook = async (set: any, book: Book) => {
    const user = useAuthStore.getState().user;

    if (!user) {
        set({ error: "You must be logged in to add books" });
        return;
    }

    set({ isLoading: true, error: null });

    try {
        const response = await fetch(`/api/books/${user.uid}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });

        if (!response.ok) {
            throw new Error(`Failed to add book: ${response.statusText}`);
        }

        set((state: any) => ({
            books: [...state.books, book],
            isLoading: false,
        }));
    } catch (error) {
        console.error("Failed to add book:", error);
        set({
            error:
                error instanceof Error ? error.message : "Failed to add book",
            isLoading: false,
        });
    }
};

// Remove a book
export const removeBook = async (set: any, bookId: string) => {
    const user = useAuthStore.getState().user;

    if (!user) {
        set({ error: "You must be logged in to remove books" });
        return;
    }

    set({ isLoading: true, error: null });

    try {
        const response = await fetch(`/api/books/${user.uid}/${bookId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to remove book: ${response.statusText}`);
        }

        set((state: any) => ({
            books: state.books.filter((book: Book) => book.id !== bookId),
            isLoading: false,
        }));
    } catch (error) {
        console.error("Failed to remove book:", error);
        set({
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to remove book",
            isLoading: false,
        });
    }
};

// Update a book
export const updateBook = async (
    set: any,
    bookId: string,
    updatedBook: Partial<Book>
) => {
    const user = useAuthStore.getState().user;

    if (!user) {
        set({ error: "You must be logged in to update books" });
        return;
    }

    set({ isLoading: true, error: null });

    try {
        const response = await fetch(`/api/books/${user.uid}/${bookId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBook),
        });

        if (!response.ok) {
            throw new Error(`Failed to update book: ${response.statusText}`);
        }

        // Update the local state
        set((state: any) => {
            const updatedBooks = state.books.map((book: Book) =>
                book.id === bookId ? { ...book, ...updatedBook } : book
            );

            // If there's a currentBook and it's the one being updated, update it too
            const updatedCurrentBook =
                state.currentBook && state.currentBook.id === bookId
                    ? { ...state.currentBook, ...updatedBook }
                    : state.currentBook;

            return {
                books: updatedBooks,
                currentBook: updatedCurrentBook,
                isLoading: false,
            };
        });
    } catch (error) {
        console.error("Failed to update book:", error);
        set({
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to update book",
            isLoading: false,
        });
    }
};
