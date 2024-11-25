"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const navLinks = [
    { name: "Register", href: "register" },
    { name: "Login", href: "login" },
    { name: "Forgot Password", href: "forgot-password" },
];

const Navigation: FC = () => {
    const pathame = usePathname();

    const prev_url = pathame.split("/");
    const slug = prev_url.splice(-1, 1)[0];

    return (
        <div className="p-4">
            {navLinks.map(({ href, name }) => {
                const isActive = href === slug;
                return (
                    <Link
                        className={isActive ? "mr-4 font-bold" : "mr-4 text-blue-500"}
                        href={prev_url.concat(href).join("/")}
                        key={name}>
                        {name}
                    </Link>
                );
            })}
        </div>
    );
};

export default Navigation;
