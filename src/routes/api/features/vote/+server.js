import { supabase } from "$lib/supabaseClient"

export async function POST({ request, locals }) {
    const session = await locals.getSession();
    const { id, user, votes } = await request.json();

    const { data, error } = await supabase
    .from('votes')
    .insert([
        { id, user: session.user.name } //key: value where key is column name 
    ])

    let vote_temp = votes + 1;
    const { feature_data, feature_error } = await supabase
    .from('features')
    .upsert({votes: vote_temp})
    .eq('id', id)

    if(error) {
        console.log(error)
        return new Response(JSON.stringify({error: error}), {status: 400});
    }

    return new Response(JSON.stringify({message: "Vote submitted"}), {status: 201})
}

export async function GET({ url }) {
    const id = url.searchParams.get('id')

    const { data: votes, error } = await supabase
    .from('features')
    .select('votes')
    .eq('id', id)

    return new Response(JSON.stringify({message: votes}))
}