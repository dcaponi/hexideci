export type key = {
    name: string,
    value: string | number,
    active?: string | null,
};

export const numberPad: key[][] = [
    [
        { name: "1", value: 1 },
        { name: "2", value: 2 },
        { name: "3", value: 3 },
        { name: "4", value: 4 },
        { name: "5", value: 5 }
    ],
    [
        { name: "6", value: 6 },
        { name: "7", value: 7 },
        { name: "8", value: 8 },
        { name: "9", value: 9 },
        { name: "0", value: 0 }
    ]
]

export const hexKeys: key[][] = [
    [
        { name: "A", value: "A" },
        { name: "B", value: "B" },
        { name: "C", value: "C" }
    ],
    [
        { name: "D", value: "D" },
        { name: "E", value: "E" },
        { name: "F", value: "F" }
    ]
];

export const controlKeys: key[][] = [
    [
        { name: "⬅", value: "x" },
        { name: "ENTER", value: "s" }
    ]
]
