"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { getLabel } from "@/utils/utils";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ButtonNotes from "../ButtonNotes";

import Button from "../Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type NoteType = "quote" | "reflection" | "memorable";

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
    const addQuote = useBookshelfStore((state) => state.addQuote);
    const addReflection = useBookshelfStore((state) => state.addReflection);
    const addMemorable = useBookshelfStore((state) => state.addMemorable);
    const getBookById = useBookshelfStore((state) => state.getBookById);
    const [heading, setHeading] = useState("");
    const [fromPage, setFromPage] = useState<string>("");
    const [toPage, setToPage] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const label = getLabel(type);

    const handleSave = async () => {
        if (!content.trim()) return;
        setIsSubmitting(true);

        try {
            const book = getBookById(bookId);
            if (!book) throw new Error("Book not found");

            const newNote = {
                id: uuidv4(),
                heading,
                fromPage: fromPage ? Number(fromPage) : undefined,
                toPage: toPage ? Number(toPage) : undefined,
                text: content,
            };

            // Use the appropriate store method based on note type
            switch (type) {
                case "quote":
                    await addQuote(bookId, newNote);
                    break;
                case "reflection":
                    await addReflection(bookId, newNote);
                    break;
                case "memorable":
                    await addMemorable(bookId, newNote);
                    break;
            }

            if (onSaved) onSaved();

            setIsOpen(false);
            setHeading("");
            setFromPage("");
            setToPage("");
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
                <ButtonNotes onClick={() => setIsOpen(true)}>
                    {label}
                </ButtonNotes>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-none bg-accent-night text-base-light rounded-lg">
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
                        placeholder={`Heading`}
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
                        {isSubmitting ? "Saving..." : `Save ${getLabel(type)}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserBookNotesModal;
