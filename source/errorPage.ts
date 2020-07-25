import wrap from "./wrap.ts";
import getHTML from "./getHTML.ts";

export default async (title: string, message: string): Promise<string> => {
    let errorPage = await getHTML("pages/error.html");
    errorPage = errorPage.replace("{error.title}", title);
    errorPage = errorPage.replace("{error.message}", message);

    return await wrap(errorPage, title);
}
