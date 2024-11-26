import TimeCom from "../../../_com/TimeCom";

export const dynamicParams = false;

export async function generateStaticParams() {
    return ["login", "register", "forgot-password"].map((slug) => ({ slug }));
}

export default function TimeSlugPage() {
    return (
        <div>
            <TimeCom />
        </div>
    );
}
