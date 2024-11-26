import TimeCom from "../../../_com/TimeCom";
import Refresh from "../../Refresh";
import { method } from "../../server";

export default function TimeSlugPage() {
    return (
        <div>
            <TimeCom />
            <Refresh callback={method} />
        </div>
    );
}
