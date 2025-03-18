"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { BiSolidBookContent } from "react-icons/bi";
import BookPageBtn from "./BookPageBtn";
import BookshelfModal from "./BookshelfModal";

interface DisplayCardSearchResultProps {
    id: string;
    imgUrl: string;
    title?: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    wantToRead?: boolean; // Added default optional properties
    reading?: boolean;
    read?: boolean;
    readAgain?: boolean;
}

const DisplayCardSearchResult = (props: DisplayCardSearchResultProps) => {
    const { books, removeBook } = useBookshelfStore();

    // Find the book in the bookshelf if it exists
    const bookInShelf = books.find((book) => book.id === props.id);
    const isInShelf = !!bookInShelf;

    return (
        <article className="w-full p-2 rounded-lg flex justify-between border border-white hover:border-green-600 shadow-xl">
            <section className="flex">
                <img
                    src={props.imgUrl}
                    alt={`Book cover of ${props.title}`}
                    className="h-24 object-contain object-center rounded mr-5"
                />
                <section>
                    <h2>{props.title || "Untitled"}</h2>
                    {props.authors && (
                        <p className="text-sm">
                            By: {props.authors.join(", ")}
                        </p>
                    )}
                    {props.publishedDate && (
                        <p className="text-sm">
                            Published: {props.publishedDate}
                        </p>
                    )}
                    {props.categories && (
                        <p className="text-sm">
                            Categories: {props.categories.join(", ")}
                        </p>
                    )}
                    {props.pageCount && (
                        <p className="text-sm">Pages: {props.pageCount}</p>
                    )}
                    {props.averageRating && (
                        <p className="text-sm">
                            Rating: {props.averageRating} / 5
                        </p>
                    )}
                    {props.description && (
                        <p className="text-sm mt-2 line-clamp-3">
                            {props.description}
                        </p>
                    )}
                </section>
            </section>
            {isInShelf ? (
                <section className="flex flex-col">
                    <BookPageBtn
                        book={{
                            id: props.id,
                            title: props.title,
                            slug: props.title
                                ? props.title.toLowerCase().replace(/\s+/g, "-")
                                : props.id,
                        }}
                    />
                    <div
                        className="tooltip tooltip-left tooltip-primary flex items-center"
                        data-tip="Remove from bookshelf"
                    >
                        <button onClick={() => removeBook(props.id)}>
                            <BiSolidBookContent className="min-h-8 min-w-8 mb-4" />
                        </button>
                    </div>
                </section>
            ) : (
                <BookshelfModal
                    book={{
                        ...props,
                        title: props.title || "Untitled",
                        wantToRead: props.wantToRead || false,
                        reading: props.reading || false,
                        read: props.read || false,
                        readAgain: props.readAgain || false,
                        addedNoFlag: false,
                    }}
                />
            )}
        </article>
    );
};

export default DisplayCardSearchResult;
