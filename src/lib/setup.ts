import { writable } from "svelte/store";
type Params = {
    decA?: number | null,
    decB?: number | null,
    deciAns?: number | null,
    hexA?: string | null,
    hexB?: string | null,
    hexiAns?: string | null,
    ready: boolean,
    hexiSub?: string | null, // user hex Submission
    deciSub?: number | null, // user dec Submission
    time: number, // time taken
    hCorrect?: boolean | null,
    dCorrect?: boolean | null,
}

export type FinalResult = {
    hexStreak: number,
    decStreak: number,
    avgTime: number,
}

export const gameParams = writable({} as Params);
export const gameResults = writable([] as Params[]);

export const newGame = () => {
    let ready = true;
    let decA = Math.floor(Math.random() * 255);
    let decB = Math.floor(Math.random() * 255);
    let deciAns = decA + decB;

    let hexA = decA.toString(16);
    let hexB = decB.toString(16);
    let hexiAns = deciAns.toString(16);
    gameParams.set({ decA, decB, deciAns, hexA, hexB, hexiAns, ready, time: 0 });
}


export const endGame = () => {
    gameParams.set({ready: false, time: 0})

    let finalResult = {
        hexStreak: 0,
        decStreak: 0,
        avgTime: 0,
    };

    gameResults.subscribe(results => {
        results.forEach(({hCorrect, dCorrect, time}) => {
            if(hCorrect) finalResult.hexStreak++
            if(dCorrect) finalResult.decStreak++
            finalResult.avgTime += time
        });
        finalResult.avgTime /= results.length
    });

    return finalResult
}