import wrap from "./wrap.ts";
import { Response } from "https://deno.land/std/http/server.ts";
import Route from "./models/Route.ts";

interface StringDict {
    [Key: string]: string;
}

export default async (page: string, route: Route): Promise<Response> => {
    const siteName = await Deno.readTextFile("./meta/site-name");
    let pageHTML = await Deno.readTextFile("./source/pages/" + page + ".html");
    const paramItemHTML = await Deno.readTextFile("./source/elements/paramItem.html");

    pageHTML = pageHTML.replaceAll("{path}", route.path || "");
    pageHTML = pageHTML.replaceAll("{hostname}", route.hostname || "");
    pageHTML = pageHTML.replaceAll("{method}", route.method || "");
    pageHTML = pageHTML.replaceAll("{description}", route.description || "");
    pageHTML = pageHTML.replaceAll("{exampleResponse}", route.exampleResponse || "");
    pageHTML = pageHTML.replaceAll("{exampleResponseVisibility}", route.exampleResponse && "block" || "hidden");

    pageHTML = pageHTML.replaceAll("{queryParamsVisibility}", (route.queryParams && route.queryParams.length > 0) && "block" || "hidden");
    pageHTML = pageHTML.replaceAll("{bodyParamsVisibility}", (route.bodyParams && route.bodyParams.length > 0) && "block" || "hidden");

    let queryParamsHTML = "";
    route.queryParams && route.queryParams.forEach(dict => {
        queryParamsHTML += paramItemHTML.replace("{paramName}", dict["name"]).replace("{paramDescription}", dict["description"]);
        queryParamsHTML += "\n";
    });
    pageHTML = pageHTML.replaceAll("{queryParams}", queryParamsHTML);

    let bodyParamsHTML = "";
    route.bodyParams && route.bodyParams.forEach(dict => {
        bodyParamsHTML += paramItemHTML.replace("{paramName}", dict["name"]).replace("{paramDescription}", dict["description"]);
        bodyParamsHTML += "\n";
    });
    pageHTML = pageHTML.replaceAll("{bodyParams}", bodyParamsHTML);

    return {
        status: 200,
        body: await wrap(pageHTML, siteName + " API docs (via dokugen)"),
        headers: new Headers({
            "Content-Type": "text/html"
        })
    };
}
