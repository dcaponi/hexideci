<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { numberPad, hexKeys, controlKeys } from "../lib/keyboard";

    const dispatch = createEventDispatcher();

    const onDigitPress = (event: Event, value: string | number) => {
        event.preventDefault();
        dispatch("digit", value);
        event.stopPropagation();
        return false;
    };

    const onControlPress = (event: Event, value: string | number) => {
        event.preventDefault();
        dispatch("control", value);
        event.stopPropagation();
        return false;
    };
</script>

{#each numberPad as row, i}
    <div class="digit-row row">
        {#each row as key, j}
            <button type="button" class="digit-key key"
              on:touchstart="{(e) => onDigitPress(e, key.value)}"
              on:mousedown="{(e) => onDigitPress(e, key.value)}"
            >{key.name}</button>
        {/each}
    </div>
{/each}

{#each hexKeys as row, i}
    <div class="hex-row row">
        {#each row as key, j}
            <button type="button" class="hex-key key"
            on:touchstart="{(e) => onDigitPress(e, key.value)}"
            on:mousedown="{(e) => onDigitPress(e, key.value)}"
            >{key.name}</button>
        {/each}
    </div>
{/each}

{#each controlKeys as row, i}
    <div class="control-row row">
        {#each row as key, j}
            <button type="button" class="control-key key" id="{key.name}"
              on:touchstart="{(e) => onControlPress(e, key.value)}"
              on:mousedown="{(e) => onControlPress(e, key.value)}"
            >{key.name}</button>
        {/each}
    </div>
{/each}

<style>
    .row {
        margin: auto;
        max-width: 255px;
        min-width: 255px;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        align-content: space-around;
    }

    .key {
        cursor: pointer;
        font-size: 3em;
        margin: auto;
        background-color: rgb(73, 73, 104);
        color: white;
        border: none;
        padding: 10px;
        line-height: 50px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .hex-key {
        flex-grow: 1;
        margin: 5px;
    }

    .control-key {
        flex-grow: 1;
        margin: 5px;
    }

    .key:hover {
        color: rgb(73, 73, 104);
        background-color: rgb(202, 202, 202);
    }
    
</style>