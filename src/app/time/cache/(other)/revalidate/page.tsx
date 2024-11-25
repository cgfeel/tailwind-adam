import { revalidatePath } from "next/cache";
import TimeCom from "../../../_com/TimeCom";
import Refresh from "./Refresh";

export default async function Page() {
    const method = async function () {
        "use server";
        revalidatePath("/time/cache/revalidate");
    };
    return (
        <div>
            <TimeCom />
            <Refresh callback={method} />
        </div>
    );
}
