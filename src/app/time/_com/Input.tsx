"use client";

import { FC, useState } from "react";

const Input: FC = () => {
    const [input, setInput] = useState("");

    return (
        <div className="mb-4 px-4">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="text-gray-900" />
        </div>
    );
};

export default Input;
