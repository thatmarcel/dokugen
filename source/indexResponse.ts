import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import wrap from "./wrap.ts";
import { Response } from "https://deno.land/std@0.58.0/http/server.ts";
import scanRoutes from "./scanRoutes.ts";

export default async (page: string): Promise<Response> => {
    const siteName = await readFileStr("./meta/site-name");
    const pageHTML = await wrap(await readFileStr("./source/pages/index.html"), siteName + " API docs (via dokugen)");
    const endpointGroupHTML = await readFileStr("./source/elements/endpointGroup.html");
    const endpointHTML = await readFileStr("./source/elements/endpoint.html");

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
