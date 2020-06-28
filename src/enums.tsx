export interface Time {
    minutes: number,
    seconds: number
}

export interface Score {
    turns: number,
    time: Time | null
}

export interface Board {
    turn: number,
    selectedBalls: number[],
    rightlyPlacedColors: number | null,
    wronglyPlacedColors: number | null
}