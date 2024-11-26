import { PropsWithChildren } from "react";
import Navigation from "../_com/Navigation";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div>
            <Navigation />
            <div className="px-4">{children}</div>
        </div>
    );
}
