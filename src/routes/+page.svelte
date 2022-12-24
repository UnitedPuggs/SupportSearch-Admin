<script>
    import { goto } from "$app/navigation"
    import { fly } from "svelte/transition";
    
    let userdata;
    let user;
    let enabled;
    export let email;
    async function verifyUser() {
        const response = await fetch("/?username=" + email);
        userdata = await response.json();
        user = userdata["username"];
        enabled = userdata["enabled"];
    }
</script>

<div id="container" class="h-96 flex flex-col flex-wrap justify-center items-center font-mono">
    <div id="header">
    <main>Welcome to the SupportSearch Admin Page</main>
    </div>
    <div id="login">
    <form on:submit={ verifyUser(email) }>
        <input class="px-1 border-black border-2 rounded-md focus:ring-1 ring-black ring-inset" type="text" placeholder="username" bind:value={email} required/>
        {#if email}
            <button transition:fly='{{ y:10, duration: 750 }}' class="bg-black rounded-lg text-white px-1 py-0.5 drop-shadow-md hover:opacity-75" on:click={ verifyUser(email) }>Login</button>
            {#if user && enabled === true}
                { goto("/dashboard") }
            {/if}
        {/if}
    </form>
    </div>
</div>