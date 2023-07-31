<script>
    import { onMount } from "svelte";

    export let feature;
    export let request_by;
    export let votes;
    export let id;

    onMount(() => {
        get_votes()
    })

    async function cast_vote() {   
        const req = await fetch("/api/features/vote", {
            method: "post",
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({ id, votes })
        })
        .then(data => {
            if(data.status == 201) {
                get_votes()
            }
        })
    }

    async function get_votes() {
        const req = await fetch(`/api/features/vote?id=${id}`)
        const res = await req.json()
        console.log(res)
    }
</script>

<div class="flex flex-col text-center [overflow-wrap:anywhere] flex-wrap border-2 border-black rounded-md font-mono p-1 min-h-52" style="box-shadow: 3px 4px grey">
    <button class="transition hover:-translate-y-2 hover:opacity-50 duration-300 py-1" on:click={ cast_vote }>^^^ {votes} ^^^</button>
    <p class="border-2 border-gray-400 rounded-md p-1 min-w-0 max-h-32 overflow-auto h-32">{feature}</p>
    <p class="font-semibold text-lg mt-auto">{request_by}</p>
</div>