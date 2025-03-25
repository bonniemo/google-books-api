import {
    addBook,
    loadBooks,
    removeBook,
    updateBook,
} from "@/app/actions/bookshelfActions";
import { Book, BookCategoryFilterKey, BookNote } from "@/types/bookAppTypes";
import { create } from "zustand";

interface BookshelfState {
    books: Book[];
    currentBook: Book | null;
    filters: Record<BookCategoryFilterKey, boolean>;
    isLoading: boolean;
    error: string | null;
    // API Methods
    loadBooks: () => Promise<void>;
    addBook: (book: Book) => Promise<void>;
    removeBook: (bookId: string) => Promise<void>;
    updateBook: (bookId: string, updatedBook: Partial<Book>) => Promise<void>;
    // UI Methods
    toggleFilter: (filter: BookCategoryFilterKey) => void;
    setCurrentBook: (book: Book | null) => void;
    clearError: () => void;
    // Note methods
    addQuote: (
        bookId: string,
        note: Omit<BookNote, "dateSaved">
    ) => Promise<void>;
    addReflection: (
        bookId: string,
        note: Omit<BookNote, "dateSaved">
    ) => Promise<void>;
    addMemorable: (
        bookId: string,
        note: Omit<BookNote, "dateSaved">
    ) => Promise<void>;
    deleteNote: (
        bookId: string,
        type: "quote" | "reflection" | "memorable",
        noteId: string
    ) => Promise<void>;
    // Helper method to get book by ID
    getBookById: (bookId: string) => Book | null;
}

const useBookshelfStore = create<BookshelfState>((set, get) => ({
    books: [],
    currentBook: null,
    isLoading: false,
    error: null,
    filters: {
        wantToRead: true,
        reading: true,
        read: true,
        readAgain: true,
        addedNoFlag: true,
    },

    // Helper method to get book by ID
    getBookById: (bookId) => {
        const { books } = get();
        return books.find((b) => b.id === bookId) || null;
    },

    // API Methods
    loadBooks: () => loadBooks(set),

    addBook: async (book) => {
        set({ isLoading: true });
        try {
            // Check if book already exists
            const { books } = get();
            const existingBook = books.find((b) => b.id === book.id);

            if (existingBook) {
                await updateBook(set, book.id, {
                    ...book,

                    quotes: existingBook.quotes || [],
                    reflections: existingBook.reflections || [],
                    memorable: existingBook.memorable || [],
                });
            } else {
                await addBook(set, book);
            }
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to add book",
                isLoading: false,
            });
        }
    },

    removeBook: (bookId) => removeBook(set, bookId),
    updateBook: (bookId, updatedBook) => updateBook(set, bookId, updatedBook),

    // UI Methods
    toggleFilter: (filter) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [filter]: !state.filters[filter],
            },
        })),
    setCurrentBook: (book) => set({ currentBook: book }),
    clearError: () => set({ error: null }),

    addQuote: async (bookId, note) => {
        const { books } = get();
        const book = books.find((b) => b.id === bookId);
        if (!book) {
            set({ error: "Book not found" });
            return;
        }

        const newQuote: BookNote = {
            ...note,
            dateSaved: new Date().toISOString(),
        };

        const updatedQuotes = book.quotes
            ? [...book.quotes, newQuote]
            : [newQuote];

        await updateBook(set, bookId, { quotes: updatedQuotes });
    },

    addReflection: async (bookId, note) => {
        const { books } = get();
        const book = books.find((b) => b.id === bookId);
        if (!book) {
            set({ error: "Book not found" });
            return;
        }

        const newReflection: BookNote = {
            ...note,
            dateSaved: new Date().toISOString(),
        };

        const updatedReflections = book.reflections
            ? [...book.reflections, newReflection]
            : [newReflection];

        await updateBook(set, bookId, { reflections: updatedReflections });
    },

    addMemorable: async (bookId, note) => {
        const { books } = get();
        const book = books.find((b) => b.id === bookId);
        if (!book) {
            set({ error: "Book not found" });
            return;
        }

        const newMemorable: BookNote = {
            ...note,
            dateSaved: new Date().toISOString(),
        };

        const updatedMemorables = book.memorable
            ? [...book.memorable, newMemorable]
            : [newMemorable];

        await updateBook(set, bookId, { memorable: updatedMemorables });
    },

    // Updated deleteNote function using only string IDs
    deleteNote: async (bookId, type, noteId) => {
        const { books } = get();
        const book = books.find((b) => b.id === bookId);
        if (!book) {
            set({ error: "Book not found" });
            return;
        }

        if (type === "quote") {
            if (!book.quotes || !Array.isArray(book.quotes)) {
                set({ error: "No quotes found for this book" });
                return;
            }

            const updatedQuotes = book.quotes.filter(
                (note) => note.id !== noteId
            );
            await updateBook(set, bookId, { quotes: updatedQuotes });
        } else if (type === "reflection") {
            if (!book.reflections || !Array.isArray(book.reflections)) {
                set({ error: "No reflections found for this book" });
                return;
            }

            const updatedReflections = book.reflections.filter(
                (note) => note.id !== noteId
            );
            await updateBook(set, bookId, { reflections: updatedReflections });
        } else if (type === "memorable") {
            if (!book.memorable || !Array.isArray(book.memorable)) {
                set({ error: "No memorable passages found for this book" });
                return;
            }

            const updatedMemorables = book.memorable.filter(
                (note) => note.id !== noteId
            );
            await updateBook(set, bookId, { memorable: updatedMemorables });
        }
    },
}));

export default useBookshelfStore;
