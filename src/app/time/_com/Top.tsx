"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const Top: FC = () => {
    const pathname = usePathname();
    const len = pathname.split("/").length;

    return <div>{len > 2 ? <Link href="/time">&lt; back to time</Link> : <Link href="/">&lt; back to home</Link>}</div>;
};

export default Top;
