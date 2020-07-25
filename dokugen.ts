import { serve } from "https://deno.land/std@0.58.0/http/server.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import handleRequest from "./source/handleRequest.ts";

console.log("\u001b[1mStarting server...\u001b[0m")

const port = parseInt(config().PORT) || 8000;

const s = serve({ port: port });

console.log("\u001b[1m\u001b[33;1mListening on port " + port.toString() + "\u001b[0m")

for await (const req of s) {
    await handleRequest(req);
}
