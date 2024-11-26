"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

const Refresh: FC<{ callback: (path: string) => Promise<void> }> = ({ callback }) => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <p>
            <button onClick={() => callback(pathname).then(() => router.refresh())}>refresh</button>
        </p>
    );
};

export default Refresh;
