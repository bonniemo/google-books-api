import { Book, BookNote } from "@/types/bookAppTypes";

export type NoteType = "quote" | "reflection" | "memorable";

export function getNotesArray(book: Book, type: NoteType): BookNote[] {
    const key = `${type}sArr`;
    return (book[key as keyof Book] as BookNote[]) || [];
}

export function prepareAddNote(
    book: Book,
    type: NoteType,
    note: Omit<BookNote, "dateSaved">
): Partial<Book> {
    if (!book) {
        throw new Error("Book is required to add a note");
    }

    const newNote: BookNote = {
        ...note,
        dateSaved: new Date().toISOString(),
    };

    const key = `${type}sArr`;
    const notes = getNotesArray(book, type);

    return { [key]: [...notes, newNote] } as Partial<Book>;
}

export function prepareUpdateNote(
    book: Book,
    type: NoteType,
    noteId: string,
    updatedNote: Partial<Omit<BookNote, "id">>
): Partial<Book> {
    if (!book) {
        throw new Error("Book is required to update a note");
    }

    if (!noteId) {
        throw new Error("Note ID is required to update a note");
    }

    const key = `${type}sArr`;
    const notes = getNotesArray(book, type);

    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex === -1) {
        throw new Error(`Note with ID ${noteId} not found`);
    }

    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = {
        ...updatedNotes[noteIndex],
        ...updatedNote,
        id: noteId,
    };

    return { [key]: updatedNotes } as Partial<Book>;
}

export function prepareDeleteNote(
    book: Book,
    type: NoteType,
    noteId: string
): Partial<Book> {
    if (!book) {
        throw new Error("Book is required to delete a note");
    }

    const key = `${type}sArr`;
    const notes = getNotesArray(book, type);
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    return { [key]: updatedNotes } as Partial<Book>;
}

export function findNote(
    book: Book,
    type: NoteType,
    noteId: string
): BookNote | undefined {
    if (!book || !noteId) return undefined;

    const notes = getNotesArray(book, type);
    return notes.find((note) => note.id === noteId);
}
