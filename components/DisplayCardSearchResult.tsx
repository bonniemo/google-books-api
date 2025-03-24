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
        <article className="w-full rounded-r-lg rounded-l-xl grid grid-cols-12 bg-accent-light text-base-dark shadow-xl max-w-full">
            <div className="bg-base-dark rounded-l-lg col-start-1 col-span-2 row-start-1"></div>
            {/* Thumbnail section */}
            <div className="col-span-4 flex items-center col-start-1 col-end-5 justify-center row-start-1">
                <img
                    src={props.imgUrl}
                    alt={`Book cover of ${props.title}`}
                    className="max-h-[80%] object-cover rounded-lg"
                />
            </div>

            {/* Info section */}
            <section className="col-span-7 pt-4 -ml-4 mr-4">
                <h2 className="text-lg font-semibold">
                    {props.title || "Untitled"}
                </h2>
                {props.authors && (
                    <p className="text-sm">By: {props.authors.join(", ")}</p>
                )}
                {props.publishedDate && (
                    <p className="text-sm">Published: {props.publishedDate}</p>
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
                    <p className="text-sm">Rating: {props.averageRating} / 5</p>
                )}
                {props.description && (
                    <p className="text-sm mt-2 line-clamp-3">
                        {props.description}
                    </p>
                )}
            </section>

            {/* Button / icon section */}
            <section className="col-span-1 flex flex-col mt-2 mr-2">
                {isInShelf ? (
                    <>
                        <BookPageBtn
                            book={{
                                id: props.id,
                                title: props.title,
                                slug: props.title
                                    ? props.title
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")
                                    : props.id,
                            }}
                        />
                        <div
                            className="tooltip tooltip-left tooltip-primary mt-2"
                            data-tip="Remove from bookshelf"
                        >
                            <button onClick={() => removeBook(props.id)}>
                                <BiSolidBookContent className="w-8 h-8" />
                            </button>
                        </div>
                    </>
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
            </section>
        </article>
    );
};

export default DisplayCardSearchResult;
