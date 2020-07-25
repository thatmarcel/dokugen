# dokugen
**Easy and fast API documentation website generator & server written in [Deno](https://deno.land)**

## Running
1. Install Deno ([instructions](https://deno.land))
2. Create 2 folders, one called **routes** and one called **meta**
3. Create a new file in **meta**, name it **site-name** and type the title of your API docs
2. Run `deno run --allow-read --allow-net --unstable --reload=https://src.dokugen.co https://src.dokugen.co/dokugen.ts`
3. Access the server at port 8000 or the value of the PORT environment variable if set

## Defining API endpoints
API endpoints are defined in the **routes** folder.
Take a look at the contents of that folder to understand the folder structure and file definition format.
