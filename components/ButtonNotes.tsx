import React from "react";

export interface ButtonNotesProps {
    type?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const ButtonNotes = ({ children, onClick }: ButtonNotesProps) => {
    return (
        <button
            onClick={onClick}
            className="text-base-dark text-center px-4 py-2 bg-accent-accent hover:bg-accent-soft inset-12 rounded-md shadow-md"
        >
            <span>Add new {children}</span>
        </button>
    );
};

export default ButtonNotes;
