export default async (pageHTML: string, title: string): Promise<string> => {
    const template = await Deno.readTextFile("./source/templates/general.html");

    return template.replace("{page.title}", title).replace("{page.content}", pageHTML);
}
