export interface BookNote {
    id: string;
    heading: string;
    text: string;
    fromPage?: number | undefined;
    toPage?: number | undefined;
    dateSaved: string;
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
    startDate?: Date | null;
    finishDate?: Date | null;
    quotesArr?: BookNote[] | null;
    reflectionsArr?: BookNote[] | null;
    memorablesArr?: BookNote[] | null;
}

export type BookCategoryFilterKey =
    | "wantToRead"
    | "reading"
    | "read"
    | "readAgain"
    | "addedNoFlag";
