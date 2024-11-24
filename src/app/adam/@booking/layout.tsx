import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-md px-8 py-8 sm:max-w-xl lg:max-w-6xl lg:px-12">
                <h2 className="text-xl text-gray-900">Popular destinations</h2>
                <p className="text-gray-600">A selection of great work-friendly cities with lots to see and explore</p>
                {children}
            </div>
        </div>
    );
}
