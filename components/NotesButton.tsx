interface NotesButtonProps {
    type?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const NotesButton = ({ children, onClick }: NotesButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="text-base-dark text-center px-4 py-2 bg-accent-soft rounded-md"
        >
            <span>Add new {children}</span>
        </button>
    );
};

export default NotesButton;
