import { useAuthStore } from "@/stores/useAuthStore";
import { Book, BookNote } from "@/types/bookAppTypes";

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

// Helper function to find a book by ID (internal use)
const findBookById = (get: any, bookId: string): Book | null => {
    const { books } = get();
    return books.find((book: Book) => book.id === bookId) || null;
};

// Get book by ID helper function (exported for store use)
export const getBookById = (get: any, bookId: string): Book | null => {
    return findBookById(get, bookId);
};

// --- Note-related actions ---

// Add a quote to a book
export const addQuote = async (
    set: any,
    get: any,
    bookId: string,
    note: Omit<BookNote, "dateSaved">
) => {
    const book = findBookById(get, bookId);
    if (!book) {
        set({ error: "Book not found" });
        return;
    }

    const newNote: BookNote = {
        ...note,
        dateSaved: new Date().toISOString(),
    };

    const existingQuotes = book.quotesArr || [];
    const updatedQuotes = [...existingQuotes, newNote];

    await updateBook(set, bookId, { quotesArr: updatedQuotes });
};

// Add a reflection to a book
export const addReflection = async (
    set: any,
    get: any,
    bookId: string,
    note: Omit<BookNote, "dateSaved">
) => {
    const book = findBookById(get, bookId);
    if (!book) {
        set({ error: "Book not found" });
        return;
    }

    const newNote: BookNote = {
        ...note,
        dateSaved: new Date().toISOString(),
    };

    const existingReflections = book.reflectionsArr || [];
    const updatedReflections = [...existingReflections, newNote];

    await updateBook(set, bookId, { reflectionsArr: updatedReflections });
};

// Add a memorable to a book
export const addMemorable = async (
    set: any,
    get: any,
    bookId: string,
    note: Omit<BookNote, "dateSaved">
) => {
    const book = findBookById(get, bookId);
    if (!book) {
        set({ error: "Book not found" });
        return;
    }

    const newNote: BookNote = {
        ...note,
        dateSaved: new Date().toISOString(),
    };

    const existingMemorables = book.memorablesArr || [];
    const updatedMemorables = [...existingMemorables, newNote];

    await updateBook(set, bookId, { memorablesArr: updatedMemorables });
};

// Delete a quote from a book
export const deleteQuote = async (
    set: any,
    get: any,
    bookId: string,
    noteId: string
) => {
    const book = findBookById(get, bookId);
    if (!book) {
        set({ error: "Book not found" });
        return;
    }

    if (!book.quotesArr || !Array.isArray(book.quotesArr)) {
        set({ error: "No quotes found for this book" });
        return;
    }

    const updatedQuotes = book.quotesArr.filter((note) => note.id !== noteId);
    await updateBook(set, bookId, { quotesArr: updatedQuotes });
};

// Delete a reflection from a book
export const deleteReflection = async (
    set: any,
    get: any,
    bookId: string,
    noteId: string
) => {
    const book = findBookById(get, bookId);
    if (!book) {
        set({ error: "Book not found" });
        return;
    }

    if (!book.reflectionsArr || !Array.isArray(book.reflectionsArr)) {
        set({ error: "No reflections found for this book" });
        return;
    }

    const updatedReflections = book.reflectionsArr.filter(
        (note) => note.id !== noteId
    );
    await updateBook(set, bookId, { reflectionsArr: updatedReflections });
};

// Delete a memorable from a book
export const deleteMemorable = async (
    set: any,
    get: any,
    bookId: string,
    noteId: string
) => {
    const book = findBookById(get, bookId);
    if (!book) {
        set({ error: "Book not found" });
        return;
    }

    if (!book.memorablesArr || !Array.isArray(book.memorablesArr)) {
        set({ error: "No memorable passages found for this book" });
        return;
    }

    const updatedMemorables = book.memorablesArr.filter(
        (note) => note.id !== noteId
    );
    await updateBook(set, bookId, { memorablesArr: updatedMemorables });
};

// Legacy deleteNote function for backward compatibility
export const deleteNote = async (
    set: any,
    get: any,
    bookId: string,
    type: "quote" | "reflection" | "memorable",
    noteId: string
) => {
    if (type === "quote") {
        return deleteQuote(set, get, bookId, noteId);
    } else if (type === "reflection") {
        return deleteReflection(set, get, bookId, noteId);
    } else if (type === "memorable") {
        return deleteMemorable(set, get, bookId, noteId);
    }
};
