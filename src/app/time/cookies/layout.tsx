import { PropsWithChildren } from "react";
import Navigation from "../_com/Navigation";

export default function layout({ children }: PropsWithChildren) {
    return (
        <div>
            <Navigation />
            {children}
        </div>
    );
}
