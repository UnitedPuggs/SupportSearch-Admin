export async function load({ parent }) { //https://kit.svelte.dev/docs/load#using-parent-data
    const { user } = await parent();

    return {
        user: user,
    };
}