import React from "react";

export interface ButtonProps {
    type?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="text-base-dark text-center px-4 py-2 bg-accent-accent hover:bg-accent-soft inset-12 rounded-md shadow-md"
        >
            {children}
        </button>
    );
};

export default Button;
