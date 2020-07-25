import getHTML from "./getHTML.ts";

export default async (pageHTML: string, title: string): Promise<string> => {
    const template = await getHTML("templates/general.html");

    return template.replace("{page.title}", title).replace("{page.content}", pageHTML);
}
