export default async (path: string): Promise<boolean> => {
    try {
        await Deno.stat(path);
        return true;
    } catch (error) {
        if (error && !error.kind === Deno.ErrorKind.NotFound) {
            throw error;
        }
    }

    return false;
};
