import Link from "next/link";
import { GiBookshelf } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import Settings from "./Settings";

const Nav = () => {
    return (
        <section className="flex justify-between md:justify-end items-center max-w-md md:max-w-full m-auto md:m-0 gap-8 p-4 mb-8">
            <Link href="/book-corner" className="flex flex-col items-center">
                <GiBookshelf />
                Book corner
            </Link>
            <Link href="/search" className="flex flex-col items-center">
                <IoSearch />
                Book Search
            </Link>
            <Link href="/" className="flex flex-col items-center">
                <ImHome />
                Home
            </Link>
            <div className="md:block hidden">
                <Settings />
            </div>
        </section>
    );
};

export default Nav;
