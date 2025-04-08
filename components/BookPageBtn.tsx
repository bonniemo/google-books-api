import Link from "next/link";
import { useState } from "react";
import { GiFeather } from "react-icons/gi";
import { PiBookOpenThin } from "react-icons/pi";

interface BookPageBtnProps {
    book: {
        id: string;
        title?: string;
    };
}

const BookPageBtn = ({ book }: BookPageBtnProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Link href={`/book-corner/book/${book.id}`} data-bookid={book.id}>
            <div className="grid grid-cols-1 grid-rows-2 items-center mb-6 tooltip tooltip-left tooltip-primary w-[44px] h-[44px]">
                <GiFeather className="min-h-8 min-w-6 col-start-1 ml-5 row-start-1 row-end-2" />
                <PiBookOpenThin className="min-h-8 min-w-8 col-start-1 col-end-3 row-start-1 row-end-3" />
            </div>
        </Link>
    );
};

export default BookPageBtn;
