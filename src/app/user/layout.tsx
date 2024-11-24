import { PropsWithChildren, ReactNode } from "react";

export default function Layout({ booking }: AdamLayoutProps) {
    return <div className="bg-gray-300 text-slate-950">{booking}</div>;
}

interface AdamLayoutProps extends PropsWithChildren {
    booking: ReactNode;
}
