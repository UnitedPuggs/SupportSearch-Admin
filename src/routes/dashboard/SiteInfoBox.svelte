<script>
    export let license;
    export let version;
    export let updated;
    export let notes;

</script>

<button class="hover:opacity-50" on:click>{license}</button>

<!-- 
    Just make a more interactive 'box' that is visible once user clicks on a license name
-->
<div id={license} class="hidden">
    <p>{license} is {version}</p>
    <p>Updated on {updated}</p>
    <p>Notes: {notes}</p>
</div>