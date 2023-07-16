export async function GET({ locals }) {
    const session = await locals.getSession();

    if(session)
        return new Response(JSON.stringify({ message: "authorized"}, {status: 200}))
    else
        return new Response(JSON.stringify({ message: "not authorized"}, {status: 400}))
}