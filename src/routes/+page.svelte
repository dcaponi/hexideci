<script lang="ts">

    import Modal from "../components/Modal.svelte"
    import { gameParams, gameResults, type FinalResult, newGame, endGame } from "../lib/setup";
	import Input from "../components/Input.svelte";

    let finalResult: FinalResult | null;
    let ranks = ["novice 👶", "apprentice 👩‍🎓", "hacker 👾", "master 🧙‍♀️", "machine 🤖"];
    let time = 0;
    let timer = setInterval(() => time++, 1000)

    const startGame = () => {
        finalResult = null;
        gameParams.set({ready: false, time: 0});
        gameResults.set([]);
        time = 0;
        timer = setInterval(() => time++, 1000)
        newGame();
    }

    const formatTime = (n: number): string => {
        let min = Math.floor(n/60);
        let sec = Math.floor(n - min * 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`
    }

    const checkAnswer = (event: { detail: any; }) => {
        let values = event.detail

        let deciString = values["deciA"] + values["deciB"] + values["deciC"]
        let hexiString = values["hexiA"] + values["hexiB"] + values["hexiC"]
        
        let deciSub = parseInt(deciString);
        let hexiSub = hexiString.toLowerCase();

        let result = {
            ...$gameParams,
            hCorrect: hexiSub == $gameParams.hexiAns,
            dCorrect: deciSub == $gameParams.deciAns,
            time, hexiSub, deciSub
        };

        gameResults.set($gameResults.concat(result))

        clearInterval(timer)
        time = 0;

        if(result.dCorrect || result.hCorrect){
            timer = setInterval(() => time++, 1000)
            newGame()
        } else {
            finalResult = endGame();
        }
    }

    const share = () => {
        let rankGap = 5;
        let s = `My HexiDeci Score\n`

        if (finalResult?.hexStreak) {
            s = s + `\nhexi: ${finalResult.hexStreak} - ${finalResult.hexStreak >= rankGap * ranks.length ? ranks[ranks.length - 1] : ranks[Math.floor(finalResult.hexStreak/rankGap)]}`
        } else {
            s = s + `\nhexi: 0 - no points 😢`
        }

        if (finalResult?.decStreak) {
            s = s + `\ndeci: ${finalResult.decStreak} - ${finalResult.decStreak >= rankGap * ranks.length ? ranks[ranks.length - 1] : ranks[Math.floor(finalResult.decStreak/rankGap)]}`
        } else {
            s = s + `\ndeci: 0 - no points 😢`
        }

        if (finalResult?.avgTime != null) {
            s = s + `\naverage time: ${formatTime(finalResult.avgTime)}\n`
        }
        s = s + `\nhttps://hexideci.com`
        navigator.clipboard.writeText(s)
    }

</script>
{#if !finalResult}
    <Modal isOpenModal={!$gameParams.ready} on:closeModal={startGame}>
        <div class="modal">
            <h3>hexideci</h3>
            <p>Instructions:</p>
            <p>You are given two <strong>hexidecimal</strong> numbers</p><br/>
            <p>Your job is to add them up in hexidecimal <strong>(0x)</strong> and decimal <strong>(0d)</strong> formats</p><br/>
            <p>Press the <button class="demo-key">ENTER</button> key to submit your answer and recieve the next prompt</p><br />
            <p>Empty boxes are <strong>removed</strong> prior to scoring</p><br/>
            <p>Play until you get both hexi and deci wrong to recieve final score</p><br/>
            <p>Rise through the ranks of <strong>{ranks.join(" ")}</strong> and challenge your friends!</p>
        </div>
    </Modal>
{:else}
    <Modal isOpenModal={!$gameParams.ready} on:closeModal={startGame}>
        <div class="modal">
            <h3>Game Over</h3>
            <p>Hexi Streak: {finalResult.hexStreak}</p>
            <p>Deci Streak: {finalResult.decStreak}</p>
            <p>Average Time: {formatTime(finalResult.avgTime)}</p>
            <br/>
            <p class="modal-opts">
                <span on:click={startGame} on:keydown={startGame}><strong>⏮️</strong> Restart</span> &emsp;
                <span on:click={share} on:keydown={share}><strong>🚀</strong> Share</span> 
            </p> 
            <hr />
            <h3>Details</h3>
            <div class="game-details">
                {#each $gameResults as result}
                    <div class="answer-line">
                        <p>{result.hexA} + {result.hexB} = <strong>0x{result.hexiAns}</strong> | <strong>0d{result.deciAns}</strong></p>
                        <p>Answer: &emsp; <strong>0x{result.hexiSub}</strong> | <strong>0d{result.deciSub || ""}</strong>&emsp;Time: <strong>{formatTime(result.time)}</strong> </p>
                    </div>
                {/each}
            </div>
        </div>
    </Modal>
{/if}
{#if $gameParams.hexA && $gameParams.hexB}
    <div class="prompt">
        <p>{$gameParams.hexA}</p>
        <p>+ {$gameParams.hexB}</p>
    </div>

    <Input on:score={checkAnswer}/>
{/if}


<style>
    .prompt {
        font-size: 3em;
        margin: auto;
        max-width: 250px;
        text-align: right;
    }

    p { margin: auto; }

    .modal {
        font-size: 20px;
        padding: 20px;
        line-height: 30px;
        overflow: auto;
    }

    .modal h3 {
        text-align: center;
    }

    .modal-opts {
        display: flex;
    }

    .answer-line {
        margin-bottom: 10px;
    }

    span {
        cursor: pointer;
        margin: auto;
    }

    span:hover {
        color:rgb(38, 255, 0);
        font-weight: bold;
    }

    .game-details {
        overflow-y:scroll;
        overflow: auto;
        max-height: 140px;
    }

    .demo-key {
        cursor: pointer;
        font-size: 20px;
        margin: auto;
        background-color: rgb(73, 73, 104);
        color: white;
        border: none;
        padding: 5px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>