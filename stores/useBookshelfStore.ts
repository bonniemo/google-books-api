import {
    addBook,
    loadBooks,
    removeBook,
    updateBook,
} from "@/app/actions/bookshelfActions";
import { Book, BookCategoryFilterKey } from "@/types/google-book-search-types";

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
}

const useBookshelfStore = create<BookshelfState>((set) => ({
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
}));

export default useBookshelfStore;
