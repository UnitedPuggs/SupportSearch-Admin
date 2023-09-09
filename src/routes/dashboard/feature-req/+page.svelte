<script>
    import MakeRequest from "$lib/MakeRequest.svelte";
    import { onMount } from "svelte";
    import Request from "../../../lib/Request.svelte";
    import { page } from '$app/stores'

    let features = []

    async function get_features() {
        const req = await fetch("/api/features")
        const res = await req.json()
        features = res.features;
        console.log(features)
        features = features;
    }

    onMount(() => {
        get_features()
    })

</script>
<svelte:head>
    <title>
    request a feature
    </title>
</svelte:head>

{#if $page.data.session?.user}
<body class="font-mono">
    <div class="my-5 px-1 py-0.5">
        <a href="/dashboard" class="hover:opacity-75 ml-5">&lt;---</a>
    </div>
    <MakeRequest on:message={ get_features }/>
    <div class="grid grid-cols-[repeat(auto-fit,_20%)] mt-10 gap-10 max-w-4xl mx-auto justify-center">
        {#each features as feature}
            <Request {...feature} />
        {/each}
    </div>
</body>
{:else}
    <h1>You'll need to log in to see this :)</h1>
{/if}