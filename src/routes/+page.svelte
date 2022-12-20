<script>
    import { createClient } from "@supabase/supabase-js";
    const supabaseUrl = 'https://gzytpbcundzfdkivabpf.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6eXRwYmN1bmR6ZmRraXZhYnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyMjc2NDcsImV4cCI6MTk4NjgwMzY0N30.Yrpo6rBSrGCKrTVXb7ut35hA1GaMRlYrSEh15lPDmoo';
    const supabase = createClient(supabaseUrl, supabaseKey)    

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
            console.log(error);
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