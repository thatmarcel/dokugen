import Route from "./Route.ts";

export default interface EndpointGroup {
    routes?: Route[],
    hostname?: string
}
