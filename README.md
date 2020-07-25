# dokugen
**Easy and fast API documentation website generator & server written in [Deno](https://deno.land)**

## Running
<<<<<<< HEAD
1. Install Deno ([instructions](https://deno.land))
2. Create 2 folders, one called **routes** and one called **meta**
3. Create a new file in **meta**, name it **site-name** and save the name that your API docs should display in it
2. Run `deno run --allow-read --allow-net --unstable https://src.dokugen.co/dokugen.ts`
3. Access the server at port 8000 or the value of the PORT environment variable if set
=======
1. Install Deno ([instructions](https://deno.land/#installation))
2. Clone the repository and go into that folder
3. Run `deno run --allow-read --allow-net --unstable dokugen.ts`
4. Access the server at port 8000 or the value of the PORT environment variable if set
>>>>>>> 7993cacaa7565fbcec232a2fface1b75518c34b8

## Defining API endpoints
API endpoints are defined in the **routes** folder.
Take a look at the contents of that folder to understand the folder structure and file definition format.
