import { walk } from "https://deno.land/std/fs/mod.ts";
import parseRoute from "./parseRoute.ts";
import Route from "./models/Route.ts";
import EndpointGroup from "./models/EndpointGroup.ts";

export default async (): Promise<EndpointGroup[]> => {
    let routes: Route[] = [];

    for await (const entry of walk("./routes/")) {
        entry.isFile && routes.push(await parseRoute(entry.path));
    }

    let endpointGroups: EndpointGroup[] = [];

    outer:
    for (const route of routes) {
        for (const endpointGroup of endpointGroups) {
            if (endpointGroup.hostname === route.hostname && endpointGroup.routes) {
                endpointGroup.routes.push(route);
                continue outer;
            }
        }

        endpointGroups.push({
            hostname: route.hostname,
            routes: [route]
        });
    }

    return endpointGroups;
}
