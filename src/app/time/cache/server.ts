"use server";

import { revalidatePath } from "next/cache";

export const method = async function (pathname: string) {
    revalidatePath(pathname);
    return `uptime: ${Date.now()}`;
};