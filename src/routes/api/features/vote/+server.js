import { supabase } from "$lib/supabaseClient"

export async function POST({ request, locals }) {
    const session = await locals.getSession();
    const { id } = await request.json();

    const { data, error } = await supabase
    .from('votes')
    .insert([
        { id, user: session.user.name } //key: value where key is column name 
    ])

    if(error) {
        console.log(error)
        return new Response(JSON.stringify({error: error}), {status: 400});
    }

    return new Response(JSON.stringify({message: "Vote submitted"}), {status: 201})
}

export async function PATCH({ request, locals }) {
    const session = await locals.getSession();
    const { id, votes, user_exists } = await request.json();

    let vote_diff;

    if(user_exists)
        vote_diff = votes - 1;
    else 
        vote_diff = votes + 1;

    const { data, error } = await supabase
    .from('features')
    .update([{ votes: vote_diff }])
    .eq('id', id)

    if(error) {
        console.log(error)
        return new Response(JSON.stringify({error: error}), {status: 400})
    }

    return new Response(JSON.stringify({message: "Votes updated"}), {status: 201})
}

export async function GET({ url }) {
    const id = url.searchParams.get('id')

    const { data: votes, error } = await supabase
    .from('features')
    .select('votes')
    .eq('id', id)

    return new Response(JSON.stringify({message: votes}))
}

export async function DELETE({ request, locals }) {
    const session = await locals.getSession();
    const { id } = await request.json()

    const { error } = await supabase
    .from('votes')
    .delete()
    .eq('id', id)
    .eq('user', session.user.name)

    if(error) {
        console.log(error)
        return new Response(JSON.stringify({message: error}), {status: 400})
    }

    return new Response(JSON.stringify({message: "Vote deleted"}), {status: 200})
}