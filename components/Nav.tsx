import Link from "next/link";
import Signout from "./Signout";

const Nav = () => {
    return (
        <section className="flex justify-end items-center gap-8 py-2 mb-8">
            <Link href="/book-corner">Book corner</Link>
            <Link href="/dashboard">Book Search</Link>
            <Signout />
        </section>
    );
};

export default Nav;
