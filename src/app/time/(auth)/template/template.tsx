import { PropsWithChildren, ReactNode } from "react";
import Navigation from "../../_com/Navigation";
import Input from "../../_com/Input";

export default function TimeSlugTemplate({ children, test }: PropsWithChildren & { test: ReactNode }) {
    return (
        <div>
            <Navigation />
            <Input />
            <div className="px-4">{children}</div>
            {test}
        </div>
    );
}
