import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    const supabaseUrl = PUBLIC_SUPABASE_URL;
    const supabaseKey = PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let license = url.searchParams.get("license");
    const { data, error } = await supabase
    .from('licenses')
    .select()
    .ilike('license', '%' + license +'%')

    if(data) {
        return json({
            licenses: data
        })
    }

    if(error)
        console.log(error);

    throw error(404, "Error occured");
}

export async function POST({ request }) {
    
}