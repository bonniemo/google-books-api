import { Book } from "@/types/bookAppTypes";
import DisplayCardSearchResult from "./DisplayCardSearchResult";

type BooksCategoryDisplayProps = {
    title: string;
    books: Book[];
};

const BooksCategoryDisplay = ({ title, books }: BooksCategoryDisplayProps) => {
    return (
        <section className="my-4 ">
            <h3 className="mb-4 text-lg font-bold tracking-wider">{title}</h3>
            <ul className="flex flex-wrap gap-6">
                {books.map((book) => (
                    <li key={book.id}>
                        <DisplayCardSearchResult
                            id={book.id}
                            imgUrl={book.imgUrl || ""}
                            title={book.title || "Untitled"}
                            authors={book.authors || undefined}
                            publishedDate={book.publishedDate || undefined}
                            description={book.description || undefined}
                            pageCount={book.pageCount ?? undefined}
                            categories={book.categories || undefined}
                            averageRating={book.averageRating ?? undefined}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default BooksCategoryDisplay;
