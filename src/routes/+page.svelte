

<script>
    import { createClient } from "@supabase/supabase-js";
    import { env } from '$env/dynamic/public';
    import { goto } from "$app/navigation"
    
    const supabaseUrl = 'https://gzytpbcundzfdkivabpf.supabase.co';
    const supabaseKey = '1';
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

<div id="container" class="h-96 flex flex-col flex-wrap justify-center items-center">
    <div id="header">
    <main class="font-mono">
        Welcome to the SupportSearch Admin Page
    </main>
    </div>
    <div id="login">
    <input class="px-1 border-black border-2 rounded-md focus:ring-1 ring-black ring-inset" type="text" placeholder="email" bind:value={email} required/>

    {#if email}
        <button class="bg-black rounded-lg text-white px-1 py-0.5 drop-shadow-md hover:opacity-75" on:click={ verifyUser(email) }>Login</button>
        {#if user}
            { goto("/dashboard") }
        {/if}
    {/if}
    </div>
</div>