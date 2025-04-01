import {
    addBook,
    addMemorable,
    addQuote,
    addReflection,
    deleteMemorable,
    deleteNote,
    deleteQuote,
    deleteReflection,
    getBookById,
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
    deleteQuote: (bookId: string, noteId: string) => Promise<void>;
    deleteReflection: (bookId: string, noteId: string) => Promise<void>;
    deleteMemorable: (bookId: string, noteId: string) => Promise<void>;
    deleteNote: (
        bookId: string,
        type: "quote" | "reflection" | "memorable",
        noteId: string
    ) => Promise<void>;

    // Helper method
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

    // Helper method
    getBookById: (bookId: string) => getBookById(get, bookId),

    // API Methods
    loadBooks: () => loadBooks(set),

    addBook: async (book: Book) => {
        set({ isLoading: true });
        try {
            // Check if book already exists
            const existingBook = getBookById(get, book.id);

            if (existingBook) {
                await updateBook(set, book.id, {
                    ...book,
                    quotesArr: existingBook.quotesArr || [],
                    reflectionsArr: existingBook.reflectionsArr || [],
                    memorablesArr: existingBook.memorablesArr || [],
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

    removeBook: (bookId: string) => removeBook(set, bookId),
    updateBook: (bookId: string, updatedBook: Partial<Book>) =>
        updateBook(set, bookId, updatedBook),

    // UI Methods
    toggleFilter: (filter: BookCategoryFilterKey) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [filter]: !state.filters[filter],
            },
        })),
    setCurrentBook: (book: Book | null) => set({ currentBook: book }),
    clearError: () => set({ error: null }),

    // Note methods
    addQuote: (bookId: string, note: Omit<BookNote, "dateSaved">) =>
        addQuote(set, get, bookId, note),

    addReflection: (bookId: string, note: Omit<BookNote, "dateSaved">) =>
        addReflection(set, get, bookId, note),

    addMemorable: (bookId: string, note: Omit<BookNote, "dateSaved">) =>
        addMemorable(set, get, bookId, note),

    deleteQuote: (bookId: string, noteId: string) =>
        deleteQuote(set, get, bookId, noteId),

    deleteReflection: (bookId: string, noteId: string) =>
        deleteReflection(set, get, bookId, noteId),

    deleteMemorable: (bookId: string, noteId: string) =>
        deleteMemorable(set, get, bookId, noteId),

    deleteNote: (
        bookId: string,
        type: "quote" | "reflection" | "memorable",
        noteId: string
    ) => deleteNote(set, get, bookId, type, noteId),
}));

export default useBookshelfStore;
