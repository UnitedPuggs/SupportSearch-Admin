<script>
    export let license;
    export let version;
    export let updated;
    export let notes;

    function minimize(name) {
        document.getElementById(name).style.display = "none";
    }
</script>

<button class="hover:opacity-50" on:click>{license}</button>

<!-- 
    Just make a more interactive 'box' that is visible once user clicks on a license name
-->
<div id={license} class="hidden flex-col">
    <!--<button on:click={ minimize(license) }>invis</button>-->
    <p>version: {version}</p>
    <p>last updated: {updated}</p>
    <div class="flex flex-row">
        {#if notes}
            <p>notes: </p><input class="px-0.5 mx-1" type="text" value={notes}><button>update</button>
        {:else}
            <p>notes: </p><input class="px-0.5 mx-1" type="text" placeholder="your note here">
        {/if}
    </div>
</div>