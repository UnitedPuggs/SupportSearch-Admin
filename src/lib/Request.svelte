<script>
    import { onMount } from "svelte";
    import { page } from '$app/stores';

    export let feature;
    export let request_by;
    export let votes;
    export let id;

    onMount(() => {
        get_votes()
    })

    async function check_if_voted() {
        const req = await fetch(`/api/features/users?id=${id}`)
        const res = await req.json();
        if(res.message.length == 0) {
            await cast_vote()
        } else {
            await update_votes(true)
            await delete_vote()
        }
    }

    async function cast_vote() {
        const req = await fetch("/api/features/vote", {
            method: "post",
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({ id })
        })
        .then(async data => {
            if(data.status == 201) {
                await update_votes(false)
                await get_votes()
            }
        })
    }

    async function delete_vote() {
        const req = await fetch('/api/features/vote', {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
    }

    async function update_votes(user_exists) {
        const req = await fetch('/api/features/vote', {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, votes, user_exists })
        })
        .then(async data => {
            if(data.status == 201)
                await get_votes()
        })
        .catch(err => console.log(err))
    }

    async function get_votes() {
        const req = await fetch(`/api/features/vote?id=${id}`)
        const res = await req.json()
        votes = res.message[0].votes
    }
</script>

<div class="flex flex-col text-center [overflow-wrap:anywhere] flex-wrap border-2 border-black rounded-md font-mono p-1 min-h-52" style="box-shadow: 3px 4px grey">
    <button class="transition hover:-translate-y-2 hover:opacity-50 duration-300 py-1" on:click={ check_if_voted }>^^^ {votes} ^^^</button>
    <p class="border-2 border-gray-400 rounded-md p-1 min-w-0 max-h-32 overflow-auto h-32">{feature}</p>
    <p class="font-semibold text-lg mt-auto">{request_by}</p>
</div>