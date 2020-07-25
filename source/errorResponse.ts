import errorPage from "./errorPage.ts";
import { Response } from "https://deno.land/std@0.58.0/http/server.ts";

export default async (title: string, message: string, status: number): Promise<Response> => {
    return {
        status: status,
        body: await errorPage(
            title,
            message
        ),
        headers: new Headers({
            "Content-Type": "text/html"
        })
    };
}
