export interface Time {
    minutes: number,
    seconds: number
}

export interface Score {
    turns: number,
    time: Time | null
}