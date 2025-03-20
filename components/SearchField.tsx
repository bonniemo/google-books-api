"use client";
import Form from "next/form";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchField = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    return (
        <>
            <Form action={pathname} className="flex w-full gap-4">
                <Input
                    key={searchParams.get("q")}
                    type="text"
                    name="q"
                    placeholder="Search for a book"
                    defaultValue={searchParams.get("q") || ""}
                    className="input input-primary w-full"
                />
                <Button
                    className="btn btn-soft btn-primary"
                    variant="outline"
                    type="submit"
                >
                    Search
                </Button>
            </Form>
        </>
    );
};

export default SearchField;
