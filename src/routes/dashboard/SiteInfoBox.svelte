<script>
    export let license;
    export let version;
    export let updated;
    export let notes;

    let focused = false;

    function isFocused() {
        focused = !focused;
    }

    //Function testing :)
    function minimize(name) {
        document.getElementById(name).style.display = "none";
    }

    function addNote() {
        fetch("/dashboard/notes", {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({license: license, notes: notes})
        })
    }
</script>

<button class="hover:opacity-75" on:click>{license}</button>

<!-- 
    Just make a more interactive 'box' that is visible once user clicks on a license name
-->
<div id={license} class="hidden flex-col">
    <!--<button on:click={ minimize(license) }>invis</button>-->
    <p>version: {version}</p>
    <p>last updated: {updated}</p>
    <div class="flex flex-row pb-1.5">
        <!-- for some reason we're getting some weird behavior when the update button appears, causes the visual jolt -->  
        <p>notes: </p><input class="px-0.5 mx-1 border-black hover:border-b-2" type="text" placeholder="your note here" bind:value={notes}>
        <button class="px-0.5 hover:opacity-75" on:click={ addNote }>update</button>
    </div>
</div>