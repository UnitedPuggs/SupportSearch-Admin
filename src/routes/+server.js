import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import { json } from "@sveltejs/kit";

export async function GET({ url, cookies }) {
    const supabaseUrl = PUBLIC_SUPABASE_URL;
    const supabaseKey = PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

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
            maxAge: 60 * 60 * 24,
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
