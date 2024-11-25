"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

const Refresh: FC<{ callback: () => Promise<void> }> = ({ callback }) => {
    const router = useRouter();
    return (
        <p>
            <button onClick={() => callback().then(() => router.refresh())}>refresh</button>
        </p>
    );
};

export default Refresh;
