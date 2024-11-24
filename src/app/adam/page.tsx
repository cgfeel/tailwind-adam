import Image from "next/image";

export default function page() {
    return (
        <div className="flex bg-gray-100">
            <div className="mx-auto max-w-md px-8 py-12 sm:max-w-xl lg:w-1/2 lg:max-w-full lg:px-12 lg:py-24">
                <div className="xl:mx-auto xl:max-w-lg">
                    <Image className="h-10" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
                    <Image
                        className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center lg:hidden"
                        src="/woman.jpeg"
                        width={320}
                        height={240}
                        alt="woman by ai"
                    />
                    <h1 className="mt-6 text-2xl font-bold leading-tight text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
                        You can work from anywhere. <br className="hidden lg:inline" />
                        <span className="text-indigo-500">Take advantage of it.</span>
                    </h1>
                    <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
                        Workcation helps you find work-friendly rentals in beautiful location so you enjoy some nice
                        weather even you're not on vacation.
                    </p>
                    <div className="mt-4 sm:mt-6">
                        <a href="#" className="btn btn-indigo mb-4 mr-4 shadow-lg">
                            Book your escape
                        </a>
                        <a href="#" className="btn btn-gray">
                            Learn more
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden lg:relative lg:block lg:w-1/2">
                <Image
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    src="/woman.jpeg"
                    width={640}
                    height={480}
                    alt="woman by ai"
                />
            </div>
        </div>
    );
}
