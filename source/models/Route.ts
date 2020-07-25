interface StringDict {
    [Key: string]: string;
}

export default interface Route {
    method?: string;
    exampleResponse?: string;
    description?: string;
    queryParams?: StringDict[],
    bodyParams?: StringDict[],
    hostname?: string,
    path?: string
}
