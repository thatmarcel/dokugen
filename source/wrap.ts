import { readFileStr } from "https://deno.land/std/fs/mod.ts";

export default async (pageHTML: string, title: string): Promise<string> => {
    const template = await readFileStr("./source/templates/general.html");

    return template.replace("{page.title}", title).replace("{page.content}", pageHTML);
}
