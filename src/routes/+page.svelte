

<script>
    import { createClient } from "@supabase/supabase-js";
    import { env } from '$env/dynamic/public'; //import to have public_ at the start of our environment variables
    
    const supabaseUrl = env.PUBLIC_SUPABASE_URL;
    const supabaseKey = env.PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let email;
    let user;
    async function verifyUser() {
        const { data, error } = await supabase
        .from('users')
        .select(`email`)
        .eq('email', email)
        .single()

        if(data) {
            user = data["email"];
            user = user;
        }
        
        if(error) {
            console.log(error)
        }
    }
</script>
<main>
    Welcome to the SupportSearch Admin Page!
</main>

<input type="text" placeholder="email" bind:value={email} required/>

{#if email}
    <button on:click={ verifyUser(email) }>Login</button>
    {#if user}
        <h1>{user}</h1>
    {/if}
{/if}