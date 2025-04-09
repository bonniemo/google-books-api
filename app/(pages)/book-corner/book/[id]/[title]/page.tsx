"use client";
import GetBookFromUrl from "@/components/GetBookFromUrl";
import SingleBookDetails from "@/components/SingleBookDetails";

const singleBookPage = () => {
    return (
        <>
            <GetBookFromUrl />
            <SingleBookDetails />
        </>
    );
};

export default singleBookPage;
