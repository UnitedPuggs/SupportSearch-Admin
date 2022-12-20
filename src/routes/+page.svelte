<script>
    import { createClient } from "@supabase/supabase-js";
	import { prevent_default } from "svelte/internal";
    const supabaseUrl = 'https://gzytpbcundzfdkivabpf.supabase.co'
    const supabaseKey = '1';
    const supabase = createClient(supabaseUrl, supabaseKey)    

    let email;
    let user;
    async function verifyUser(email) {
        const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)

        if(data) {
            user = data.email
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
    <h1>{user}</h1>
{/if}