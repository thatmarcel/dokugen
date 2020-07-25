import { ServerRequest } from "https://deno.land/std/http/server.ts";
import exists from "./fileExists.ts";
import errorResponse from "./errorResponse.ts";
import indexResponse from "./indexResponse.ts";
import pageResponse from "./pageResponse.ts";
import parseRoute from "./parseRoute.ts";

export default async (req: ServerRequest) => {
    switch (req.url) {
        case "/" || "/index.html":
            req.respond(await indexResponse("index"));
            break;
        default:
            if (await exists("./routes" + req.url)) {
                req.respond(await pageResponse("endpoint", await parseRoute("routes" + req.url)));
                break;
            }

            req.respond(await errorResponse(
                "Page Not Found",
                "Looks like somebody has a typo in their link",
                404
            ));
            break;
    }
}
