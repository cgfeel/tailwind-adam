const TimeCom = async () => {
    const data = await fetch("https://f.m.suning.com/api/ct.do");
    const now = (await data.json()) as TimeType;
    const val = new Date(now.currentTime).toString();

    return <div>time now: {val}</div>;
};

export default TimeCom;

export type TimeType = {
    api: string;
    code: string;
    currentTime: number;
    msg: string;
};
