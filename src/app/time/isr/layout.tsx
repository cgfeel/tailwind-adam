import Navigation from "@/app/time/_com/Navigation";
import { PropsWithChildren } from "react";
import Timeup from "./Timeup";

export default function layout({ children }: PropsWithChildren) {
    return (
        <>
            <Navigation />
            {children}
            <Timeup />
        </>
    );
}
