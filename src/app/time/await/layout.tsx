import { PropsWithChildren } from "react";
import TimeCom from "../_com/TimeCom";

export default function layout({ children }: PropsWithChildren) {
    return (
        <div className="p-4">
            <div className="mb-4">start time: {Date.now()}</div>
            <TimeCom name="layout time" />
            {children}
        </div>
    );
}
