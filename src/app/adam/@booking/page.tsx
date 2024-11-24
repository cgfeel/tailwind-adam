import Image from "next/image";

export default async function page() {
    const result = await fetch("https://run.mocky.io/v3/f9e2ebca-b2e3-4fa3-8a46-53db1adbb237");
    const data = (await result.json()) as BookItem[];

    return (
        <div className="-mx-4 flex flex-wrap">
            {data.map((item) => (
                <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3" key={item.city}>
                    <div className="flex items-center overflow-hidden rounded-lg bg-white shadow-lg">
                        <div className="h-32 w-32">
                            <Image
                                className="h-full w-full flex-shrink-0 object-cover object-center"
                                height={128}
                                width={128}
                                src={item.imageUrl}
                                alt={item.imageAlt}
                            />
                        </div>
                        <div className="px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-800">{item.city}</h3>
                            <p className="text-gray-600">${item.averagePrice} / night average</p>
                            <div className="mt-4">
                                <a href="#" className="text-sm font-semibold text-indigo-500 hover:text-indigo-400">
                                    Explore {item.propertyCount} properties
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

interface BookItem {
    averagePrice: number;
    city: string;
    imageAlt: string;
    imageUrl: string;
    propertyCount: number;
}
