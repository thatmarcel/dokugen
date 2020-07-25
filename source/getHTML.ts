import exists from "./exists.ts";

interface StringDict {
    [Key: string]: string;
}

class HTMLCache {
    public static dict: StringDict = {};
}

export default async (path: string): Promise<string> => {
    /* if (exists("./source/" + path)) {
        return await Deno.readTextFile("./source/" + path);
    } */

    if (HTMLCache.dict[path]) {
        return HTMLCache.dict[path];
    }

    return new Promise<string>(async (resolve, reject) => {
        await fetch("https://src.dokugen.co/source/" + path).then(resp => resp.text()).then(html => {
            HTMLCache.dict[path] = html;
            resolve(html);
        }).catch(err => reject);
    })
}
