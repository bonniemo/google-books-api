import { getGoogleBooks } from "@/app/actions/getGoogleBooks";
import SearchField from "@/components/SearchField";
import SearchResult from "@/components/SearchResult";

export default async function DashboardHome(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const { q: searchValue } = searchParams as { [key: string]: string };

    let result = null;
    let searchAttempted = false;

    if (searchValue) {
        searchAttempted = true;
        try {
            result = await getGoogleBooks({ query: searchValue });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <article className="px-2 py-6">
            <SearchField />
            <SearchResult
                result={result}
                searchAttempted={searchAttempted}
                searchQuery={searchValue || null}
            />
        </article>
    );
}
