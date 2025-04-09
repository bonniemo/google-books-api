"use client";
import GetBookFromUrl from "@/components/single-book-page/GetBookFromUrl";
import SingleBookDetails from "@/components/single-book-page/SingleBookDetails";

const singleBookPage = () => {
    return (
        <>
            <GetBookFromUrl />
            <SingleBookDetails />
        </>
    );
};

export default singleBookPage;
