"use client";

import { useCountdow } from "@/app/time/_com/hooks";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const ReTime: FC<{ callback: () => void }> = ({ callback }) => {
    const pathname = usePathname();
    const [path, setPath] = useState(pathname);

    useEffect(() => {
        if (path !== pathname) {
            callback();
            setPath(path);
        }
    }, [pathname, path, callback]);

    return <span>Timeup, cache is refreshed!</span>;
};

const TimeupCom: FC = () => {
    const [seconds, uptime] = useCountdow(10);
    const router = useRouter();

    return (
        <div className="p-4">
            <div className="mb-4">这只是本地计数，方便掌握计时，不代表服务端真实缓存情况：</div>
            {seconds === 0 ? <ReTime callback={() => {}} /> : <span>cache will be refresh: {seconds}</span>}
            <div className="mt-4">
                <a
                    onClick={() => {
                        router.refresh();
                        uptime();
                    }}>
                    click refresh
                </a>
            </div>
        </div>
    );
};

export default function Timeup() {
    const pathname = usePathname();
    return pathname.split("/").length === 4 && <TimeupCom />;
}
