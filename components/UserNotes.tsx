import { Book, BookNote } from "@/types/bookAppTypes";
import UserBookNotesModal from "./UserBookNotesModal";

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
                <h3 className="text-2xl">{typePlural}</h3>
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
                            {note.text}
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
