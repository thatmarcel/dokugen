import wrap from "./wrap.ts";
import { Response } from "https://deno.land/std/http/server.ts";
import scanRoutes from "./scanRoutes.ts";

export default async (page: string): Promise<Response> => {
    const siteName = await Deno.readTextFile("./meta/site-name");
    const pageHTML = await wrap(await Deno.readTextFile("./source/pages/index.html"), siteName + " API docs (via dokugen)");
    const endpointGroupHTML = await Deno.readTextFile("./source/elements/endpointGroup.html");
    const endpointHTML = await Deno.readTextFile("./source/elements/endpoint.html");

    const endpointGroups = await scanRoutes();

    let endpointGroupsHTML = "";

    for (const endpointGroup of endpointGroups || []) {
        let endpointsHTML = "";
        for (const route of endpointGroup.routes || []) {
            endpointsHTML += endpointHTML
                                    .replace("{href}", (route.hostname || "") + (route.path || ""))
                                    .replace("{path}", route.path || "")
                                    .replace("{description}", route.description || "");
            endpointsHTML += "\n";
        }

        endpointGroupsHTML += endpointGroupHTML
                                    .replace("{hostname}", endpointGroup.hostname || "")
                                    .replace("{endpoints}", endpointsHTML);
        endpointGroupsHTML += "\n";
    }

    return {
        status: 200,
        body: pageHTML.replace("{endpointGroups}", endpointGroupsHTML).replace("{siteName}", siteName),
        headers: new Headers({
            "Content-Type": "text/html"
        })
    };
}
