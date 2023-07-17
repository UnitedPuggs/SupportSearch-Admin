export async function GET({ locals, url }) {
    const session = await locals.getSession();
    const ext_version = url.searchParams.get('ext_version')

    if(session && ext_version > "1.6.4")
        return new Response(JSON.stringify({ message: "authorized"}, {status: 200}))
    else
        return new Response(JSON.stringify({ message: "not authorized"}, {status: 400}))
}