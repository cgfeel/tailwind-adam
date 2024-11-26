import { useCallback, useEffect, useRef, useState } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
    const callbackRef = useRef<() => void>();
    useEffect(() => {
        callbackRef.current = callback
    });

    useEffect(() => {
        let id: NodeJS.Timeout | null = null;
        if (delay !== null) {
            id = setInterval(() => callbackRef.current && callbackRef.current(), delay);
        }
        return () => {
            if (id !== null) {
                clearInterval(id);
                id = null;
            }
        }
    }, [delay]);
};

export const useCountdow = (initialTime: number = 0, delay: number | null = 1000) => {
    const timeRecord = useRef([[Date.now(), 0]]);
    const [time, setTime] = useState(timeRecord.current[0][0]);

    const overTime = initialTime * 1000 - timeRecord.current.reduce(
        (current, [start, end]) => current + (end || time) - start, 0
    );

    const isOver = overTime <= 0;
    const upTime = useCallback(() => {
        timeRecord.current = [[Date.now(), 0]];
        setTime(timeRecord.current[0][0]);
    }, []);
    
    useEffect(() => {
        const last = timeRecord.current.length - 1;
        if (delay === null) {
            timeRecord.current[last][1] = Date.now();
        } else {
            const [, end] = timeRecord.current[last];
            if (end > 0) {
                timeRecord.current = [...timeRecord.current, [Date.now(), 0]]
            }
        }
    }, [delay]);

    useInterval(() => {
        setTime(Date.now());
    }, isOver ? null : delay);

    return [isOver ? 0 : Math.ceil(overTime / 1000), upTime] as const;
};
