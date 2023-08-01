import { supabase } from '$lib/supabaseClient'

export async function GET({ url, locals }) {
    const session = await locals.getSession();
    const id = url.searchParams.get('id')

    const { data: users, error } = await supabase
    .from('votes')
    .select('*')
    .eq('id', id)
    .eq('user', session.user.name)

    if(error) {
        console.log(error)
        return new Response(JSON.stringify({message: error}), {status: 400})
    }

    return new Response(JSON.stringify({message: users}), {status: 200})
}