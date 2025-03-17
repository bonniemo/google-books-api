"use client";
import Form from "next/form";
import { usePathname, useSearchParams } from "next/navigation";

const SearchField = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    return (
        <>
            <Form action={pathname} className="flex w-full gap-6">
                <input
                    key={searchParams.get("q")}
                    type="text"
                    name="q"
                    placeholder="Search for a book"
                    defaultValue={searchParams.get("q") || ""}
                    className="input input-primary w-full"
                />
                <button className="btn btn-soft btn-primary" type="submit">
                    Search
                </button>
            </Form>
        </>
    );
};

export default SearchField;
