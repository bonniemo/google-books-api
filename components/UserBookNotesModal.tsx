"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
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

interface UserBookNotesModalProps {
    type: "reflection" | "quote" | "memorable"; // Strictly type the possible values
    bookId: string; // Expect bookId to know which book to update
}

const UserBookNotesModal = ({ type, bookId }: UserBookNotesModalProps) => {
    const { updateBook } = useBookshelfStore();
    const [content, setContent] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false); // Control modal open/close

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

        // Create a dynamic update object based on the type
        const updateData: Partial<any> = {};
        updateData[type] = content;

        await updateBook(bookId, updateData); // Update book in DB
        setIsOpen(false); // Close modal
        setContent(""); // Clear input field
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    Add new {type}
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
                            className="col-span-3"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`Enter your ${type} here...`}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save {getLabel()}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserBookNotesModal;
