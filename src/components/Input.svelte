<script lang="ts">
    import Keyboard from "./Keyboard.svelte";
    import { createEventDispatcher } from "svelte";
	import { gameParams } from "$lib/setup";

    let dispatch = createEventDispatcher();

    let inputs: Record<string, HTMLInputElement> = {}
    let values: Record<string, string> = {
        "hexiA": "", "hexiB": "", "hexiC": "",
        "deciA": "", "deciB": "", "deciC": " ",
    }

    gameParams.subscribe(params => {
        if(params.ready && inputs['hexiC']) {
            inputs['hexiC'].focus();
        }
    })

    const execControl = (event: { detail: any; }) => {
        if(event.detail == "x"){
            values[document.activeElement.id] = ""
            moveLeft(document.activeElement.id)
        }
        if(event.detail == "s"){
            dispatch("score", values)
            values = {
                "hexiA": "", "hexiB": "", "hexiC": "",
                "deciA": "", "deciB": "", "deciC": "",
            }
        }
    }

    const execDigit = (event: { detail: any; }) => {
        if (document.activeElement.id.slice(0,4) == "hexi") {
            values[document.activeElement.id] = event.detail
            moveRight(document.activeElement.id)
        }
        if(document.activeElement.id.slice(0,4) == "deci" && /[0-9]/g.test(event.detail)){
            values[document.activeElement.id] = event.detail
            moveRight(document.activeElement.id)
        } 
    }

    const moveLeft = (curr: string) => {
        if (curr == "hexiB") inputs["hexiA"].focus()
        if (curr == "hexiC") inputs["hexiB"].focus()
        if (curr == "deciB") inputs["deciA"].focus()
        if (curr == "deciC") inputs["deciB"].focus()
    }

    const moveRight = (curr: string) => {
        if (curr == "hexiA") inputs["hexiB"].focus()
        if (curr == "hexiB") inputs["hexiC"].focus()
        if (curr == "deciA") inputs["deciB"].focus()
        if (curr == "deciB") inputs["deciC"].focus()
    }

    const moveUp = (curr: string) => {
        if (curr == "deciA") inputs["hexiA"].focus()
        if (curr == "deciB") inputs["hexiB"].focus()
        if (curr == "deciC") inputs["hexiC"].focus()
    }

    const moveDown = (curr: string) => {
        if (curr == "hexiA") inputs["deciA"].focus()
        if (curr == "hexiB") inputs["deciB"].focus()
        if (curr == "hexiC") inputs["deciC"].focus()
    }

    const handleKeyInput = (e: KeyboardEvent) => {
        e.preventDefault();

        if(e.key.toLowerCase() == "enter") {
            dispatch("score", values)
            values = {
                "hexiA": "", "hexiB": "", "hexiC": "",
                "deciA": "", "deciB": "", "deciC": "",
            }
        }

        if(e.key.toLowerCase() == "arrowleft") moveLeft(e.target.id)
        if(e.key.toLowerCase() == "arrowright") moveRight(e.target.id)
        if(e.key.toLowerCase() == "arrowup") moveUp(e.target.id)
        if(e.key.toLowerCase() == "arrowdown") moveDown(e.target.id)

        if(e.key.toLowerCase() == "backspace") {
            values[e.target.id] = ""
            moveLeft(e.target.id)
        }
        if(e.key.toLowerCase() == "tab") {
            if(e.target.id.slice(0,4) == "hexi"){
                moveDown(e.target.id)
            }
            if(e.target.id.slice(0,4) == "deci"){
                moveUp(e.target.id)
            }
        }

        if(e.key.length == 1 && !(e.metaKey || e.shiftKey)){
            if(e.target.id.slice(0,4) == "hexi") {
                if(/[0-9a-fA-F]/.test(e.key)) {
                    values[e.target.id] = e.key.toLowerCase()
                    moveRight(e.target.id)
                }
            } else {
                if(/[0-9]/g.test(e.key.toLowerCase()) || e.target.value) {
                    values[e.target.id] = e.key.toLowerCase()
                    moveRight(e.target.id)
                }
            }
        }
    }
</script>

<div class="input-row">
    <p class="input-label">0x&nbsp;</p>
    <input bind:value={values["hexiA"]} on:focus={() => inputs["hexiA"].setSelectionRange(0,1)} bind:this={inputs["hexiA"]} on:keydown={handleKeyInput} type="text" maxlength="1" id="hexiA"/>
    <input bind:value={values["hexiB"]} on:focus={() => inputs["hexiB"].setSelectionRange(0,1)} bind:this={inputs["hexiB"]} on:keydown={handleKeyInput} type="text" maxlength="1" id="hexiB"/>
    <input bind:value={values["hexiC"]} on:focus={() => inputs["hexiC"].setSelectionRange(0,1)} bind:this={inputs["hexiC"]} on:keydown={handleKeyInput} type="text" maxlength="1" id="hexiC"/>
</div>

<div class="input-row">
    <p class="input-label">0d&nbsp;</p>
    <input bind:value={values["deciA"]} on:focus={() => inputs["deciA"].setSelectionRange(0,1)} bind:this={inputs["deciA"]} on:keydown={handleKeyInput} type="text" maxlength="1" id="deciA"/>
    <input bind:value={values["deciB"]} on:focus={() => inputs["deciB"].setSelectionRange(0,1)} bind:this={inputs["deciB"]} on:keydown={handleKeyInput} type="text" maxlength="1" id="deciB"/>
    <input bind:value={values["deciC"]} on:focus={() => inputs["deciC"].setSelectionRange(0,1)} bind:this={inputs["deciC"]} on:keydown={handleKeyInput} type="text" maxlength="1" id="deciC"/>
</div>

<Keyboard on:control="{execControl}" on:digit="{execDigit}" />
 
<style>
    .input-label {
        display: inline-block;
        margin: auto;
        margin-top: 40px;
        margin-right: 5px;
        vertical-align: middle;
        font-size: 2em;
    }

    .input-row {
        text-align: right;
        margin: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        max-width: 250px;
    }

    input {
        max-width: 40px;
        flex-grow: 1;
        height: 40px;
        caret-color: transparent;
        margin-top: 20px;
        font-size: 3em;
        text-align: center;
    }

    @media screen and (max-width: 500px) {
        input {
            font-size: 1em;
        }
    }

    /*** Works on common browsers ***/
    ::selection {
        background-color: transparent;
    }

    /*** Mozilla based browsers ***/
    ::-moz-selection {
        background-color: transparent;
    }

    /***For Other Browsers ***/
    ::-o-selection {
        background-color: transparent;
    }

    ::-ms-selection {
        background-color: transparent;
    }

    /*** For Webkit ***/
    ::-webkit-selection {
        background-color: transparent;
    }
</style>