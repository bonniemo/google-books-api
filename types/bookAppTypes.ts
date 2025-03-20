export interface BookNote {
    text: string;
    page?: number;
    currentDate: string;
}

export interface Book {
    id: string;
    title: string;
    authors?: string[] | null;
    publishedDate?: string | null;
    description?: string | null; // Google Books' original description
    pageCount?: number | null;
    categories?: string[] | null;
    averageRating?: number | null;
    imgUrl?: string | null;
    wantToRead: boolean;
    reading: boolean;
    read: boolean;
    readAgain: boolean;
    addedNoFlag: boolean;
    rating?: number | null;
    reviewDate?: string | null;
    startDate?: string | null;
    finishDate?: string | null;
    quotes?: BookNote[] | null; // Updated to BookNote with currentDate
    reflections?: BookNote[] | null; // Updated to BookNote with currentDate
    memorable?: BookNote[] | null; // Updated to BookNote with currentDate
}

export type BookCategoryFilterKey =
    | "wantToRead"
    | "reading"
    | "read"
    | "readAgain"
    | "addedNoFlag";
