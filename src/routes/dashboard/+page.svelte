<script>
    import { fly, slide } from "svelte/transition";
    import { page } from "$app/stores";

    let licensedata;

    export let license;

    async function getLicenses() {
        const response = await fetch("/dashboard?license=" + license);
        licensedata = await response.json();
        console.log(licensedata["licenses"]);
    }
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

{#if $page.data.user}
<div>
    <button class="m-5 bg-black text-white">Menu</button>
</div>

<div id="container" class="h-96 flex flex-col flex-wrap justify-center items-center font-mono">
    <div>
        <form on:submit={ getLicenses }>
            {#if !license}
                <h1 class="my-5" transition:slide='{{ delay: 100, duration: 200 }}'>What are you looking for?</h1>
            {/if}
            <input class="px-1 border-black border-2 rounded-md focus:ring-1 ring-black ring-inset" type="text" placeholder="license name" bind:value={license}>
            {#if license}
                <button transition:fly='{{ y:10, duration: 750 }}' class="bg-black rounded-lg text-white px-1 py-0.5 drop-shadow-md hover:opacity-75" on:click={ getLicenses }>Search</button>
            {/if}
        </form>
    </div>
</div>
{:else}
    <h1>You'll need to log in to see this :)</h1>
{/if}