<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let request = "";

    async function submit_request() {
        const req = await fetch("/api/features", {
            method: "post",
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({ feature: request })
        })
        dispatch('message')
    }
</script>

<div id="container" class="font-mono justify-center items-center border-2 w-fit m-auto rounded-md border-black p-2">
    <form on:submit|preventDefault class="flex flex-col text-center">
        <h1>submit a feature request</h1>
        <textarea class="border-2 rounded-md focus:ring-1 ring-black ring-onset resize-none p-0.5" bind:value={ request } rows="5"></textarea>
        <button type="submit" class="p-1 bg-black text-white rounded-md hover:opacity-75 w-fit m-auto mt-2" on:click={ submit_request }>submit</button>
    </form>
</div>