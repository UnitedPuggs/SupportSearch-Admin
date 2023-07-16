<script>
    import { fly, slide } from "svelte/transition";
    import { page } from "$app/stores";
    import SiteInfoBox from "./SiteInfoBox.svelte";

    let licensedata;

    let license;

    $: if(licensedata && !license) { //subscribes to if licensedata exists but input is empty, just clear licensedata
        clearPreviousSearch();
    }

    //Clears licensedata when text input is cleared
    function clearPreviousSearch() {
        licensedata["licenses"] = [];
        licensedata = licensedata;
    }

    //Toggles visibility of SiteInfoBox components
    function toggleVisibility(name) {
        if(document.getElementById(name).style.display == "flex")
            document.getElementById(name).style.display = "none";
        else
            document.getElementById(name).style.display = "flex";
    }

    //Gets info from Supabase database in regards to license info or makes API calls to find licenses not in the database
    async function getLicenses() {
        const response = await fetch("/api?license=" + license);
        licensedata = await response.json();
        if(licensedata["licenses"].length == 0) {
            let obj; //https://stackoverflow.com/questions/61228241/how-do-i-get-fetch-result-from-api-to-store-as-a-global-variable
            let url;
            const rescst = await fetch("https://" + license + ".clubspeedtiming.com/api/index.php/version/current.json?key=cs-dev").catch(err => console.log(err)) //checking if cs timing returns anything
            if(!rescst) {
                const rescs = await fetch("https://" + license + ".clubspeed.com/api/index.php/version/current.json?key=cs-dev").catch(err => console.log(err)) //checking if cs returns anything
                obj = await rescs.json();
                url = ".clubspeed.com";
            } else {
                obj = await rescst.json();
                url = ".clubspeedtiming.com";
            }

            if(obj) { //if the license doesn't exist in the database but does exist, it will post that license to the database
                fetch("/api", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: JSON.stringify({license: license, url: url, version: obj["CurrentVersion"], updated: obj["LastUpdated"]})
                })
                .catch(err => console.log(err))
                await getLicenses();
            }
        } else { //Version checking whenever I get any licensedata just to make make sure nothing is out of date
            for(let i = 0; i < licensedata["licenses"].length; ++i) {
                let checker = await fetch("https://" + licensedata["licenses"][i].license + licensedata["licenses"][i].url + "/api/index.php/version/current.json?key=cs-dev").catch(err => console.log(err))
                let checkerObj = await checker.json();
                if(checkerObj.CurrentVersion.localeCompare(licensedata["licenses"][i].version)) {
                    fetch("/api", {
                        method: "PATCH",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({license: licensedata["licenses"][i].license, version: checkerObj.CurrentVersion, updated: checkerObj.LastUpdated})
                    })
                    .catch(err => console.log(err));
                    await getLicenses();
                }
            }
        }
        console.log(licensedata);
        licensedata = licensedata;
    }
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

{#if $page.data.session?.user} <!-- Checks to see if you're logged in -->
<div class="flex flex-row ml-5 gap-1">
    <button class="my-5 px-1 py-0.5 drop-shadow-md hover:opacity-75 font-mono">Feature Requests</button>
    <button class="my-5 px-1 py-0.5 drop-shadow-md hover:opacity-75 font-mono">Script Requests</button>
</div>

<div id="container" class="h-96 flex flex-col flex-wrap justify-center items-center font-mono">
    <div class="max-h-0 w-72">
        <form on:submit={ getLicenses }> 
            {#if !license}
                <h1 class="my-5" transition:slide='{{ delay: 100, duration: 200 }}'>What are you looking for?</h1>
            {/if}

            <input class="mx-auto px-1 border-black border-2 rounded-md focus:ring-1 ring-black ring-inset" type="text" placeholder="license name" bind:value={license}>
            {#if license}
                <button transition:fly='{{ y:10, duration: 750 }}' class="bg-black rounded-lg text-white px-1 py-0.5 drop-shadow-md hover:opacity-75" type="submit">Search</button>
            {/if}
        </form>
        {#if licensedata && license}
            <div id="licenses" class="flex flex-col pt-5 mr-14">
            {#each licensedata["licenses"] as name}
                <SiteInfoBox license={name.license} version={name.version} updated={name.updated.substring(0, 10)} notes={name.notes} 
                on:click={ toggleVisibility(name.license) }/>
            {/each}
            </div>
        {/if}
    </div>
</div>
{:else}
    <h1>You'll need to log in to see this :)</h1>
{/if}
