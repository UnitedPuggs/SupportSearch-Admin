import { supabase } from "$lib/supabaseClient"
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    let license = url.searchParams.get("license");
    const { data, error } = await supabase
    .from('licenses')
    .select()
    .ilike('license', '%' + license +'%');

    if(data) {
        return json({
            licenses: data
        });
    }

    if(error)
        console.log(error);

    throw error(404, "Error occured");
}

export async function POST({ request }) {
    const { license, version, updated } = await request.json();

    const { data, error } = await supabase
    .from('licenses')
    .insert([
        { license: license, version: version, updated: updated } //key: value where key is column name 
    ])

    if(error) {
        console.log(error)
        return new Response(JSON.stringify({error: error}), {status: 400});
    }

    return new Response(JSON.stringify({message: "Successfully inserted!"}), {status: 201})
}