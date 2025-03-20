export interface GoogleBooksSearchResponse {
    kind?: string; // e.g. "books#volumes"
    totalItems?: number; // total number of items found
    items?: GoogleBookVolume[];
}

export interface GoogleBookVolume {
    kind?: string; // e.g. "books#volume"
    id?: string; // e.g. "YTZKAAAAYAAJ"
    etag?: string; // e.g. "Vu9VabENqkw"
    selfLink?: string; // e.g. "https://www.googleapis.com/books/v1/volumes/YTZKAAAAYAAJ"
    volumeInfo?: GoogleBookVolumeInfo;
    saleInfo?: {};
    accessInfo?: {};
    searchInfo?: {
        textSnippet?: string;
    };
}

export interface GoogleBookVolumeInfo {
    title?: string;
    authors?: string[] | null;
    publisher?: string | null;
    publishedDate?: string | null;
    description?: string | null;
    industryIdentifiers?: Array<{
        type?: string;
        identifier?: string;
    }> | null;
    readingModes?: {
        text?: boolean;
        image?: boolean;
    } | null;
    pageCount?: number | null;
    printType?: string | null;
    categories?: string[] | null;
    averageRating?: number | null;
    ratingsCount?: number | null;
    maturityRating?: string | null;
    allowAnonLogging?: boolean | null;
    contentVersion?: string | null;
    panelizationSummary?: {
        containsEpubBubbles?: boolean;
        containsImageBubbles?: boolean;
    } | null;
    imageLinks?: {
        smallThumbnail?: string | null;
        thumbnail?: string | null;
    } | null;
    language?: string | null;
    previewLink?: string | null;
    infoLink?: string | null;
    canonicalVolumeLink?: string | null;
}
