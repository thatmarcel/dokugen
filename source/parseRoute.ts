import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import Route from "./models/Route.ts";

interface Dictionary<T> {
    [Key: string]: T;
}

export default async (filePath: string) => {
    const file = await readFileStr(filePath);

    const multilineAttributeNames: string[] = [
        "ExampleResponse",
        "Description"
    ]

    const arrayAttributeNames: string[] = [
        "QueryParams",
        "BodyParams"
    ]

    let isInAttribute = false;
    let isInArray = false;
    let currentAttributeValue = "";
    let attributeName: string = "u";
    let stringDict: Dictionary<string> = {};
    let arrayDict: Dictionary<Dictionary<string>[]> = {};
    for (let line of file.split("\n")) {
        if (isInAttribute && line !== "---") {
            currentAttributeValue += "\n";
            currentAttributeValue += line;
            continue;
        } else if (isInAttribute) {
            stringDict[attributeName] = currentAttributeValue.trim();
            isInAttribute = false;
            continue;
        }

        if (isInArray && line.startsWith("- ")) {
            line = line.substr(2);
            let components = line.split(":");
            let name = components.shift()?.trim() || "u";
            let description = components.join(":").trim();
            arrayDict[attributeName].push({ name: name, description: description });
            continue;
        }

        let components = line.split(":");

        attributeName = components.shift()?.trim() || "u";

        if (multilineAttributeNames.includes(attributeName)) {
            isInAttribute = true;
            currentAttributeValue = "";
            continue;
        } else if (arrayAttributeNames.includes(attributeName)) {
            isInArray = true;
            arrayDict[attributeName] = [];
            continue;
        } else if (components.length < 1) {
            continue;
        }

        currentAttributeValue = components.join(":").trim();
        stringDict[attributeName] = currentAttributeValue;
    }

    let pathComponents = filePath.split("/");
    pathComponents.shift(); // Remove routes/
    const hostname = pathComponents.shift();
    const path = "/" + pathComponents.join("/");


    const route: Route = {
        method: stringDict["Method"],
        exampleResponse: stringDict["ExampleResponse"],
        description: stringDict["Description"],
        queryParams: arrayDict["QueryParams"],
        bodyParams: arrayDict["BodyParams"],
        hostname: hostname,
        path: path
    }

    return route;
}
