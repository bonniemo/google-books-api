import Link from "next/link";
import { GiBookshelf } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import Settings from "./Settings";
import ThemeToggleBtn from "./ThemeToggleBtn";

const Nav = () => {
    return (
        <section className="w-full px-2 py-4 bg-base-light bg-opacity-90 drop-shadow-md text-base-dark dark:bg-accent-night dark:text-base-light dark:bg-opacity-85 flex justify-between">
            <div className="hidden md:flex">
                <ThemeToggleBtn />
            </div>
            <div className="flex justify-between  md:justify-end items-center max-w-md md:max-w-full m-auto md:m-0 gap-8">
                <Link href="/" className="flex flex-col items-center">
                    <ImHome className="min-w-5 min-h-5" />
                    Home
                </Link>
                <Link href="/search" className="flex flex-col items-center">
                    <IoSearch className="min-w-5 min-h-5" />
                    Book Search
                </Link>
                <Link
                    href="/book-corner"
                    className="flex flex-col items-center"
                >
                    <GiBookshelf className="min-w-5 min-h-5" />
                    Book corner
                </Link>
                <div className="md:block hidden">
                    <Settings />
                </div>
            </div>
        </section>
    );
};

export default Nav;
