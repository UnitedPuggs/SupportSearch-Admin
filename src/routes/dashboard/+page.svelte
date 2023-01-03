<script>
    import { fly, slide } from "svelte/transition";
    import { page } from "$app/stores";
    import SiteInfoBox from "./SiteInfoBox.svelte";
  import { get } from "svelte/store";

    let licensedata;
    let info;
    let menuOn = false;
    let menuoptions = ["Feature Requests", "Users"]

    let license;

    function clickMenu() {
        menuOn = !menuOn;
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
        document.createElement("SiteInfoBox");
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

    function abc(name) {
        const element = new SiteInfoBox({target: document.querySelector("#k1bluffton")})
    }

    function makeVis(name) {
        document.getElementById(name).style.display = "block"
    }
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

{#if $page.data.user}
<div class="flex flex-row">
<button class="my-5 ml-5 px-1 py-0.5 bg-black text-white drop-shadow-md hover:opacity-75 font-mono" on:click={ clickMenu }>Menu</button>
{#if menuOn}
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
            <div id="licenses" class="flex flex-col pt-5 mr-10">
            {#each licensedata["licenses"] as name}
                <SiteInfoBox license={name.license} version={name.version} updated={name.updated} notes={name.notes} on:click={ getCSTimingVers(name.license), makeVis(name.license) }/>
            {/each}
            </div>
        {/if}
    </div>
</div>
{:else}
    <h1>You'll need to log in to see this :)</h1>
{/if}