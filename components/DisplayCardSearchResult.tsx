"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { useState } from "react";
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
    wantToRead?: boolean;
    reading?: boolean;
    read?: boolean;
    readAgain?: boolean;
}

const DisplayCardSearchResult = (props: DisplayCardSearchResultProps) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { books, removeBook } = useBookshelfStore();

    // Find the book in the bookshelf if it exists
    const bookInShelf = books.find((book) => book.id === props.id);
    const isInShelf = !!bookInShelf;

    return (
        <article className="rounded-r-lg rounded-l-xl grid grid-cols-12 bg-accent-light text-base-dark shadow-xl">
            <div className="bg-base-dark rounded-l-lg col-start-1 col-span-2 row-start-1"></div>
            {/* Thumbnail section */}
            <div className="col-span-4 flex mt-4 col-start-1 col-end-5 justify-center row-start-1">
                <img
                    src={props.imgUrl}
                    alt={`Book cover of ${props.title}`}
                    className="max-h-[11rem] max-w-[7rem] object-cover rounded-lg mr-8 mb-4"
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
                    <div className="mt-2">
                        <div className="relative">
                            <p className="text-sm">
                                {showFullDescription
                                    ? props.description
                                    : `${props.description.slice(0, 100)}${
                                          props.description.length > 100
                                              ? "..."
                                              : ""
                                      }`}
                            </p>
                            {props.description.length > 100 && (
                                <button
                                    className="text-xs underline text-primary mt-1 mb-2"
                                    onClick={() =>
                                        setShowFullDescription(
                                            !showFullDescription
                                        )
                                    }
                                >
                                    {showFullDescription
                                        ? "Show less"
                                        : "Show more"}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* Button / icon section */}
            <section className="col-span-1 flex flex-col mt-2">
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
