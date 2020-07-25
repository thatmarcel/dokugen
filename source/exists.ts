export default async (path: string): Promise<boolean> => {
    try {
        await Deno.stat(path);
    } catch (error) {
        return false;
    }

    return true;
};
