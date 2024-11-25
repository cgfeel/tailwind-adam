import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return <div className="px-4">{children}</div>;
}
