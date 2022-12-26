<script>
    import { fly, slide } from "svelte/transition";
    import { page } from "$app/stores";

    let licensedata;
    let info;
    let menuon = false;
    let menuoptions = ["Feature Requests", "Users"]

    export let license;

    function clickMenu() {
        menuon = !menuon;
    }

    async function getLicenses() {
        const response = await fetch("/dashboard?license=" + license);
        licensedata = await response.json();
        console.log(licensedata);
        licensedata = licensedata;
    }

    async function getCSTimingVers(license) {
        fetch("https://" + license + ".clubspeedtiming.com/api/index.php/version/current.json?key=cs-dev")
        .then(response => response.json())
        .then(data => { 
            info = data; 
            console.log(info); 
        })
        .catch(err => {
                console.log(err);
                if(err.message.includes("Failed to fetch"))
                    getCSVers(license);
        })
    }

    async function getCSVers(license) {
        fetch("https://" + license + ".clubspeed.com/api/index.php/version/current.json?key=cs-dev")
        .then(response => response.json())
        .then(data => { 
            info = data; 
            console.log(info); 
        })
        .catch(err => {
            console.log(err);
        })
    }
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

{#if $page.data.user}
<div class="flex flex-row">
<button class="my-5 ml-5 px-1 py-0.5 bg-black text-white drop-shadow-md hover:opacity-75 font-mono" on:click={ clickMenu }>Menu</button>
{#if menuon}
    {#each menuoptions as option, i}
        <button in:fly='{{ delay: 100 + (i * 100), duration: 200 }}' out:fly='{{ delay: 100 - (i * 100), duration: 200}}' class="px-1 my-5 bg-black text-white hover:opacity-75 font-mono">{option}</button>
    {/each}
{/if}
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
        {#if licensedata && license}
            <div class="flex flex-col pt-5 mr-10">
            {#each licensedata["licenses"] as name}
                <button class="hover:opacity-50" on:click={ getCSTimingVers(name.license) }>{name.license}</button>
            {/each}
            </div>
        {/if}
    </div>
</div>
{:else}
    <h1>You'll need to log in to see this :)</h1>
{/if}