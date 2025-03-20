import {
    addBook,
    loadBooks,
    removeBook,
    updateBook,
} from "@/app/actions/bookshelfActions";
import {
    Book,
    BookCategoryFilterKey,
    BookNote,
} from "@/types/google-book-search-types";
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
    // New methods for adding notes with timestamps
    addQuote: (bookId: string, text: string, page?: number) => Promise<void>;
    addReflection: (
        bookId: string,
        text: string,
        page?: number
    ) => Promise<void>;
    addMemorable: (
        bookId: string,
        text: string,
        page?: number
    ) => Promise<void>;
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
    // API Methods
    loadBooks: () => loadBooks(set),
    addBook: (book) => addBook(set, book),
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

    // New methods to add notes with timestamps
    addQuote: async (bookId, text, page) => {
        const { books } = get();
        const book = books.find((b) => b.id === bookId);

        if (!book) {
            set({ error: "Book not found" });
            return;
        }

        const newQuote: BookNote = {
            text,
            page,
            currentDate: new Date().toISOString(),
        };

        const updatedQuotes = book.quotes
            ? [...book.quotes, newQuote]
            : [newQuote];

        await updateBook(set, bookId, { quotes: updatedQuotes });
    },

    addReflection: async (bookId, text, page) => {
        const { books } = get();
        const book = books.find((b) => b.id === bookId);

        if (!book) {
            set({ error: "Book not found" });
            return;
        }

        const newReflection: BookNote = {
            text,
            page,
            currentDate: new Date().toISOString(),
        };

        const updatedReflections = book.reflections
            ? [...book.reflections, newReflection]
            : [newReflection];

        await updateBook(set, bookId, { reflections: updatedReflections });
    },

    addMemorable: async (bookId, text, page) => {
        const { books } = get();
        const book = books.find((b) => b.id === bookId);

        if (!book) {
            set({ error: "Book not found" });
            return;
        }

        const newMemorable: BookNote = {
            text,
            page,
            currentDate: new Date().toISOString(),
        };

        const updatedMemorables = book.memorable
            ? [...book.memorable, newMemorable]
            : [newMemorable];

        await updateBook(set, bookId, { memorable: updatedMemorables });
    },
}));

export default useBookshelfStore;
