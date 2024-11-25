import { PropsWithChildren } from "react";
import Navigation from "../_com/Navigation";
import Input from "../_com/Input";

export default function TimeSlugTemplate({ children }: PropsWithChildren) {
    return (
        <div>
            <Navigation />
            <Input />
            <div className="px-4">{children}</div>
        </div>
    );
}
