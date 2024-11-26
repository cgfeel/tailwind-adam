import TimeCom from "../_com/TimeCom";

export default async function Page() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
        <>
            <div className="mb-4">page time: {Date.now()}</div>
            <TimeCom />
        </>
    );
}
