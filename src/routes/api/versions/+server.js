import { supabase } from "$lib/supabaseClient"
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    let version = url.searchParams.get("version")

    let { data: licenses, error } = await supabase
    .from('licenses')
    .select('license')
    .ilike('version', version)

    if(licenses) {
        return json({
            licenses: licenses
        });
    }

    if(error)
        console.log(error);

    throw error(404, "Error occured");
}