import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const theme = cookieStore.get("system-theme");
    return (
        <div>
            {theme?.value}：{Date.now()}
        </div>
    );
}
