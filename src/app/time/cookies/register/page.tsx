import { cookies } from "next/headers";
import TimeCom from "../../_com/TimeCom";

export default async function Page() {
    const cookieStore = await cookies();
    const theme = cookieStore.get("system-theme");
    return (
        <div>
            {theme?.value}
            <TimeCom />
        </div>
    );
}
