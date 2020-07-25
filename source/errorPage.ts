import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import wrap from "./wrap.ts";

export default async (title: string, message: string): Promise<string> => {
    let errorPage = await readFileStr("./source/pages/error.html");
    errorPage = errorPage.replace("{error.title}", title);
    errorPage = errorPage.replace("{error.message}", message);

    return await wrap(errorPage, title);
}
