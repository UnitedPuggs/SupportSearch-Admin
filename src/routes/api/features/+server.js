import { supabase } from "$lib/supabaseClient"

export async function POST({ request, locals }) {
    const session = await locals.getSession();
    const { feature, request_by } = await request.json();

    const { data, error } = await supabase
    .from('features')
    .insert([
        { feature, request_by: session.user.name } //key: value where key is column name 
    ])

    if(error) {
        console.log(error)
        return new Response(JSON.stringify({error: error}), {status: 400});
    }

    return new Response(JSON.stringify({message: "Feature submitted"}), {status: 201})
}

export async function GET() {
    const { data, error } = await supabase
    .from('features')
    .select('*')

    if(data) {
        return new Response(JSON.stringify({features: data}, {status: 200}))
    }

    if(error)
        console.log(error);

    throw error(404, "Error occured");
}