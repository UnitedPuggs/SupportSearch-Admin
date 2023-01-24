import { supabase } from "$lib/supabaseClient"

export async function PATCH({ request }) {
    console.log("stinky")
    const { license, notes } = await request.json();

    const { error } = await supabase
    .from('licenses')
    .update({ notes: notes })
    .eq('license', license);

    if(error) {
        console.log(error)
        return new Response(JSON.stringify({error: error}), {status: 400});
    }

    return new Response(JSON.stringify({message: "Note added!"}), {status: 200});
}