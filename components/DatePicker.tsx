"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export function DatePicker({
    date,
    setDate,
}: {
    date: Date | null;
    setDate: Dispatch<SetStateAction<Date | null>>;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        setOpen(true);
                    }}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0 bg-background border shadow-md"
                align="start"
                sideOffset={4}
                style={{ zIndex: 9999 }} // Ensure high z-index
                onInteractOutside={(e) => {
                    e.preventDefault(); // Keep popup open when clicking outside
                    if (
                        e.target instanceof HTMLElement &&
                        !e.target.closest('[role="dialog"]')
                    ) {
                        setOpen(false);
                    }
                }}
            >
                <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(day) => {
                        setDate(day || null);
                        setOpen(false); // Close the popover after selection
                    }}
                    initialFocus
                    disabled={(date) => false} // Make all dates selectable
                />
            </PopoverContent>
        </Popover>
    );
}
