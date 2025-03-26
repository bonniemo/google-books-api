"use client";
import { ChangeEvent } from "react";

type RadioButtonsProps<T extends string> = {
    options: { label: string; value: T }[];
    name: string;
    value: T;
    onChange: (value: T) => void;
};

export default function RadioButtons<T extends string>({
    options,
    name,
    value,
    onChange,
}: RadioButtonsProps<T>) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value as T);
    };

    return (
        <div className="flex gap-2">
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 focus:ring-accent-accent border-gray-300"
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
}
