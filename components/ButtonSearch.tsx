import { ButtonNotesProps } from "./ButtonNotes";

const ButtonSearch = ({ children, onClick }: ButtonNotesProps) => {
    return (
        <button
            onClick={onClick}
            className="text-base-dark text-center px-4 py-2 bg-accent-accent hover:bg-accent-soft rounded-md"
        >
            <span>{children}</span>
        </button>
    );
};

export default ButtonSearch;
