import { PropsWithChildren } from "react";
import Top from "./_com/Top";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div>
            <Top />
            <hr />
            {children}
        </div>
    );
}
