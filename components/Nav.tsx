import Link from "next/link";
import { GiBookshelf } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import Settings from "./Settings";

const Nav = () => {
    return (
        <section className="flex justify-between md:justify-end items-center max-w-md md:max-w-full m-auto md:m-0 gap-8 p-4 mb-8">
            <Link href="/" className="flex flex-col items-center">
                <ImHome className="min-w-7 min-h-7" />
                Home
            </Link>
            <Link href="/search" className="flex flex-col items-center">
                <IoSearch className="min-w-7 min-h-7" />
                Book Search
            </Link>
            <Link href="/book-corner" className="flex flex-col items-center">
                <GiBookshelf className="min-w-7 min-h-7" />
                Book corner
            </Link>
            <div className="md:block hidden">
                <Settings />
            </div>
        </section>
    );
};

export default Nav;
