"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { Book, BookNote } from "@/types/google-book-search-types";
import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

// Define valid note types
type NoteType = "reflection" | "quote" | "memorable";

interface UserBookNotesModalProps {
    type: NoteType;
    bookId: string;
    onSaved?: () => void;
}

const UserBookNotesModal = ({
    type,
    bookId,
    onSaved,
}: UserBookNotesModalProps) => {
    const { updateBook, books } = useBookshelfStore();
    const [content, setContent] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Display label based on type
    const getLabel = () => {
        switch (type) {
            case "reflection":
                return "Reflection";
            case "quote":
                return "Quote";
            case "memorable":
                return "Memorable Passage";
            default:
                return "Content";
        }
    };

    const handleSave = async () => {
        if (!content.trim()) return; // Prevent empty input

        setIsSubmitting(true);

        try {
            // Find the current book
            const currentBook = books.find((book) => book.id === bookId);

            if (!currentBook) {
                throw new Error("Book not found");
            }

            // Create the new note with the required structure
            const newNote: BookNote = {
                text: content,
                currentDate: new Date().toISOString(),
            };

            // Create the update object based on note type
            const updateData: Partial<Book> = {};

            if (type === "reflection") {
                const existingReflections = currentBook.reflections || [];
                updateData.reflections = [...existingReflections, newNote];
            } else if (type === "quote") {
                const existingQuotes = currentBook.quotes || [];
                updateData.quotes = [...existingQuotes, newNote];
            } else if (type === "memorable") {
                const existingMemorables = currentBook.memorable || [];
                updateData.memorable = [...existingMemorables, newNote];
            }

            await updateBook(bookId, updateData);

            if (onSaved) {
                onSaved();
            }

            setIsOpen(false);
            setContent("");
        } catch (error) {
            console.error(`Error saving ${type}:`, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    Add new
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add {getLabel()}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content-input" className="text-right">
                            {getLabel()}
                        </Label>
                        <textarea
                            id="content-input"
                            className="col-span-3 min-h-[100px] p-2 border rounded"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`Enter your ${type} here...`}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSave}
                        disabled={isSubmitting || !content.trim()}
                    >
                        {isSubmitting ? "Saving..." : `Save ${getLabel()}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserBookNotesModal;
