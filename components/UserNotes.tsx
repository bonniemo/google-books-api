import { Book, BookNote } from "@/types/bookAppTypes";

import { formatDate } from "@/utils/utils";
import UserBookNotesModal from "./UserBookNotesModal";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";

interface UserNotesProps {
    book: Book;
    loadBooks: () => void;
    type: "quote" | "reflection" | "memorable";
}

const UserNotes = ({ book, loadBooks, type }: UserNotesProps) => {
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

    return (
        <section className="mt-10">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl uppercase">{typePlural}</h3>
                <UserBookNotesModal
                    type={type}
                    bookId={book.id}
                    onSaved={() => loadBooks()}
                />
            </div>
            <ul className="mt-8 space-y-4">
                {notes.length > 0 ? (
                    notes.map((note: BookNote, index: number) => (
                        <li
                            key={index}
                            className="p-2 rounded bg-card-bg text-card-text"
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
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <span>
                                            Pages {note.fromPage} to{" "}
                                            {note.toPage}
                                        </span>
                                        <p>{note.text}</p>
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
