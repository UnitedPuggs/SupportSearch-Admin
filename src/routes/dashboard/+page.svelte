<script>
    import { fly, slide } from "svelte/transition";
    import { page } from "$app/stores";
    import SiteInfoBox from "./SiteInfoBox.svelte";

    let licensedata;
    let menuOn = false;
    let menuoptions = ["Feature Requests", "Users"]

    let license;

    

    function clickMenu() {
        menuOn = !menuOn;
    }

    async function getLicenses() {
        const response = await fetch("/dashboard?license=" + license);
        licensedata = await response.json();
        if(licensedata["licenses"].length == 0) {
            let obj; //https://stackoverflow.com/questions/61228241/how-do-i-get-fetch-result-from-api-to-store-as-a-global-variable
            const rescst = await fetch("https://" + license + ".clubspeedtiming.com/api/index.php/version/current.json?key=cs-dev").catch(err => console.log(err))
            if(!rescst) {
                const rescs = await fetch("https://" + license + ".clubspeed.com/api/index.php/version/current.json?key=cs-dev").catch(err => console.log(err))
                obj = await rescs.json();
                obj += ".clubspeed.com";
                console.log(obj);
            } else {
                obj = await rescst.json();
                obj += ".clubspeedtiming.com";
            }

            if(obj) {
                fetch("/dashboard", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: JSON.stringify({license: license, version: obj["CurrentVersion"], updated: obj["LastUpdated"]})
                })
                .catch(err => console.log(err))
                getLicenses();
            }
        }
        console.log(licensedata);
        licensedata = licensedata;
    }

    function toggleVisibility(name) {
        if(document.getElementById(name).style.display == "flex")
            document.getElementById(name).style.display = "none";
        else
            document.getElementById(name).style.display = "flex";
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
                <button transition:fly='{{ y:10, duration: 750 }}' class="bg-black rounded-lg text-white px-1 py-0.5 drop-shadow-md hover:opacity-75" type="submit">Search</button>
            {/if}
        </form>
        {#if licensedata && license}
            <div id="licenses" class="flex flex-col pt-5 mr-10">
            {#each licensedata["licenses"] as name}
                <SiteInfoBox license={name.license} version={name.version} updated={name.updated} notes={name.notes} on:click={ toggleVisibility(name.license) }/>
            {/each}
            </div>
        {/if}

    </div>
</div>
{:else}
    <h1>You'll need to log in to see this :)</h1>
{/if}
