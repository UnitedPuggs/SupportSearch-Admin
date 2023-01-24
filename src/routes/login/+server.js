import { supabase } from "$lib/supabaseClient"
import { json } from "@sveltejs/kit";

export async function GET({ url, cookies }) {
    //Make sure you're throwing your env file into the project directory

    let user = url.searchParams.get("username");

    const { data, error } = await supabase
    .from('users')
    .select(`*`)
    .eq('username', user.toLowerCase())
    .single()

    if(data && data["enabled"] === true) {
        cookies.set('session', data["username"], {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
        })
        return json({
            username: data["username"],
            enabled: data["enabled"]
        })
    }
        
    if(error) {
        console.log(error)
        throw error(404, "Not found");
    }
}
