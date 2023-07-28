<script>
    export let feature;
    export let request_by;
    export let votes;


</script>

<div class="flex flex-col text-center [overflow-wrap:anywhere] flex-wrap border-2 border-black rounded-md font-mono p-1 min-h-52">
    <button class="transition hover:-translate-y-2 hover:opacity-50 duration-300 py-1">^^^ {votes} ^^^</button>
    <p class="border-2 border-gray-400 rounded-md p-1 min-w-0 max-h-32 overflow-auto h-32">{feature}</p>
    <p class="font-semibold text-lg mt-auto">{request_by}</p>
</div>