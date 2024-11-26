"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

const Refresh: FC<{ callback: (path: string) => Promise<string> }> = ({ callback }) => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <p>
            <button
                onClick={() =>
                    callback(pathname).then((data) => {
                        router.refresh();
                        console.log(data);
                    })
                }>
                refresh
            </button>
        </p>
    );
};

export default Refresh;
