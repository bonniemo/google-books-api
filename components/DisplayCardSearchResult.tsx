"use client";
import useBookshelfStore from "@/stores/useBookshelfStore";
import { useState } from "react";
import { BiSolidBookContent } from "react-icons/bi";
import noCoverImg from "../public/no-cover.png";
import BookPageBtn from "./BookPageBtn";
import BookshelfModal from "./BookshelfModal";

import { Book } from "@/types/bookAppTypes";
import { formatDate } from "@/utils/utils";
import { FaRegStar, FaStar } from "react-icons/fa6";

const DisplayCardSearchResult = (props: Book) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const books = useBookshelfStore((state) => state.books);
    const removeBook = useBookshelfStore((state) => state.removeBook);
    const bookInShelf = books.find((book) => book.id === props.id);
    const isInShelf = !!bookInShelf;
    const rating = bookInShelf?.rating || null;

    return (
        <article className="rounded-r-lg rounded-l-xl grid grid-cols-6 gap-2 bg-accent-light text-base-dark shadow-xl w-full max-w-[48rem] xl:max-w-[34rem]">
            <div className="bg-base-dark rounded-l-lg col-start-1 col-end-2 row-start-1 row-end-3 sm:row-end-2 w-2 sm:w-full"></div>
            <div className=" flex mt-4 col-start-1 sm:col-end-3 col-end-5 sm:justify-center pl-4 sm:pl-0 row-start-1">
                <img
                    src={props.imgUrl ? props.imgUrl : noCoverImg.src}
                    alt={`Book cover of ${props.title}`}
                    className=" max-w-[80%] object-cover rounded-lg mb-4"
                />
            </div>

            {/* Info section */}
            <section className="w-full sm:col-start-3 sm:col-end-6 sm:row-start-1 row-start-2 col-start-1 col-end-7 mr-2 sm:mr-0 sm:pt-4 pl-4 sm:pl-0  mb-4 text-sm leading-relaxed">
                <h2 className="text-lg font-semibold">
                    {props.title || "Untitled"}
                </h2>
                {props.authors && <p>By: {props.authors.join(", ")}</p>}
                {props.publishedDate && <p>Published: {props.publishedDate}</p>}
                {props.categories && (
                    <p>Categories: {props.categories.join(", ")}</p>
                )}
                {props.pageCount && <p>Pages: {props.pageCount}</p>}
                {isInShelf && (
                    <>
                        {bookInShelf.startDate && (
                            <div>
                                Started Reading:{" "}
                                {formatDate(bookInShelf.startDate)}
                            </div>
                        )}
                        {bookInShelf.finishDate && (
                            <div>
                                Finished Reading:{" "}
                                {formatDate(bookInShelf.finishDate)}
                            </div>
                        )}
                        <label className="flex items-center gap-1 mt-1">
                            <span>Rating:</span>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const filled =
                                        rating !== null && star <= rating;

                                    return (
                                        <div
                                            key={star}
                                            className="text-base-dark"
                                            aria-label={`Rate ${star} stars`}
                                        >
                                            {filled ? (
                                                <FaStar className="w-5 h-5" />
                                            ) : (
                                                <FaRegStar className="w-5 h-5" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </label>
                    </>
                )}
                {props.description && (
                    <div className="mt-2">
                        <div className="relative">
                            <p
                                className={`${
                                    props.description.length < 100 && "mb-2"
                                } text-sm`}
                            >
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
                                    className="text-xs underline text-primary mt-1"
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

            <section className="col-start-6 sm:row-start-1 sm:col-end-7 flex items-center flex-col mt-2">
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
                            rating: rating,
                        }}
                    />
                )}
            </section>
        </article>
    );
};

export default DisplayCardSearchResult;
