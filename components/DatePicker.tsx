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
import * as React from "react";

interface DatePickerProps {
    date: Date | null;
    setDate: (date: Date | null) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
    const [calendarOpen, setCalendarOpen] = React.useState(false);

    return (
        <div className="relative z-50">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0 z-[9999] bg-base-light"
                    align="start"
                    sideOffset={4}
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Calendar
                        mode="single"
                        selected={date || undefined}
                        onSelect={(newDate) => {
                            setDate(newDate || null);
                            setCalendarOpen(false);
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default DatePicker;
