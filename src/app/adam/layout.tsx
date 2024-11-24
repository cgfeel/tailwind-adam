import { PropsWithChildren, ReactNode } from "react";
import "./index.css";

export default function Layout({ booking, children }: AdamLayoutProps) {
    return (
        <div className="bg-gray-300 text-slate-950">
            {children}
            {booking}
        </div>
    );
}

interface AdamLayoutProps extends PropsWithChildren {
    booking: ReactNode;
}
