"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { Book, BookNote } from "@/types/bookAppTypes";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface UserBookNotesModalProps {
    type: string;
    bookId: string;
    onSaved?: () => void;
}

const UserBookNotesModal = ({
    type,
    bookId,
    onSaved,
}: UserBookNotesModalProps) => {
    const { updateBook, books } = useBookshelfStore();
    const [heading, setHeading] = useState("");
    const [fromPage, setFromPage] = useState<string>("");
    const [toPage, setToPage] = useState<string>("");
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

    const label = getLabel();

    const handleSave = async () => {
        if (!content.trim()) return;

        setIsSubmitting(true);

        try {
            const currentBook = books.find((book) => book.id === bookId);

            if (!currentBook) {
                throw new Error("Book not found");
            }

            // Create the new note with the required structure
            const newNote: BookNote = {
                id: uuidv4(),
                heading: heading,
                fromPage: fromPage ? Number(fromPage) : undefined,
                toPage: toPage ? Number(toPage) : undefined,
                text: content,
                dateSaved: new Date().toISOString(),
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
            <DialogContent className="sm:max-w-[425px] border-none">
                <DialogHeader>
                    <DialogTitle>Add {label}</DialogTitle>
                </DialogHeader>

                <Label htmlFor="heading" className="">
                    <h3>{label} heading</h3>
                    <Input
                        id="heading"
                        className=" p-2 border rounded mt-2"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        placeholder={`Enter your ${type} here...`}
                    />
                </Label>
                <div className="flex gap-4">
                    <Label htmlFor="fromPage" className="">
                        <h3>From page</h3>
                        <Input
                            type="number"
                            id="fromPage"
                            className="p-2 border rounded mt-2"
                            value={fromPage}
                            onChange={(e) => setFromPage(e.target.value)}
                            placeholder="From page"
                        />
                    </Label>
                    <Label htmlFor="toPage" className="">
                        <h3>To page</h3>
                        <Input
                            type="number"
                            id="toPage"
                            className=" p-2 border rounded mt-2"
                            value={toPage}
                            onChange={(e) => setToPage(e.target.value)}
                            placeholder="To Page"
                        />
                    </Label>
                </div>
                <Label htmlFor="content" className="">
                    <h3>{label} text</h3>
                    <Textarea
                        id="content"
                        className=" min-h-[100px] p-2 border rounded mt-2"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`Enter your ${type} here...`}
                    />
                </Label>

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
