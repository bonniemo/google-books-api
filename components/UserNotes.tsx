import useBookshelfStore from "@/stores/useBookshelfStore";
import { Book, BookNote } from "@/types/bookAppTypes";
import { formatDate } from "@/utils/utils";
import { useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import UserBookNotesModal from "./UserBookNotesModal";

interface UserNotesProps {
    book: Book;
    loadBooks: () => void;
    type: "quote" | "reflection" | "memorable";
}

const UserNotes = ({ book, loadBooks, type }: UserNotesProps) => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { deleteNote } = useBookshelfStore();

    const typePlural = `${type}s`;

    const getNotes = (): BookNote[] => {
        switch (type) {
            case "quote":
                return Array.isArray(book.quotes) ? book.quotes : [];
            case "reflection":
                return Array.isArray(book.reflections) ? book.reflections : [];
            case "memorable":
                return Array.isArray(book.memorable) ? book.memorable : [];
            default:
                return [];
        }
    };

    const notes = getNotes();

    const handleDelete = async (noteId: string) => {
        setDeletingId(noteId);

        try {
            await deleteNote(book.id, type, noteId);
            loadBooks();
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <section className="px-2 pt-6 pb-8 my-12">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl">{typePlural}</h3>
                <UserBookNotesModal
                    type={type}
                    bookId={book.id}
                    onSaved={() => loadBooks()}
                />
            </div>
            <ul className="mt-8 space-y-4">
                {notes.length > 0 ? (
                    notes.map((note: BookNote) => (
                        <li
                            key={note.id}
                            className="px-2 bg-accent-light text-base-dark rounded-lg shadow-lg"
                        >
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div>
                                            <h3 className="text-xl">
                                                {note.heading}
                                            </h3>
                                            <span className="text-sm">
                                                {formatDate(note.dateSaved)}
                                            </span>
                                        </div>
                                        <div className="bg-base-dark rounded-l-lg col-start-11 col-span-1 row-start-1"></div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {note.fromPage && note.toPage && (
                                            <span>
                                                Pages {note.fromPage} to{" "}
                                                {note.toPage}
                                            </span>
                                        )}
                                        <p>{note.text}</p>
                                        <div className="flex justify-end">
                                            <Button
                                                onClick={() =>
                                                    handleDelete(note.id)
                                                }
                                                disabled={
                                                    deletingId === note.id
                                                }
                                                variant="destructive"
                                            >
                                                {deletingId === note.id ? (
                                                    "Deleting..."
                                                ) : (
                                                    <BsFillTrash3Fill />
                                                )}
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 italic">
                        No {typePlural} yet
                    </li>
                )}
            </ul>
        </section>
    );
};

export default UserNotes;
