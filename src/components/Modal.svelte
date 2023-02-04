<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let isOpenModal: boolean;

    const closeModal = () => {
        if(isOpenModal){
            isOpenModal = false;
            dispatch('closeModal', {isOpenModal})
        }
    }

</script>
<svelte:body on:keypress={closeModal}/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="background" style="--display:{isOpenModal ? 'block' : 'none'};" on:click={closeModal} on:keydown={closeModal}></div>
<div id="modal" style="--display:{isOpenModal ? 'block' : 'none'};">
    <slot/>
</div>
<style>
    #background {
        display: var(--display);
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.7);
    }

    #modal {
        display: var(--display);
        position: fixed;
        width: 75%;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #121214; 
    }
</style>