type GameInitialized = [number, number, number]
const gameInitialized: GameInitialized = [2022, 1, 26]
const initialDate: Date = new Date(...gameInitialized)
const now: number = Date.now()
const difference: number = now - +initialDate
const millisecondsPerDay: number = 24 * 60 * 60 * 1000
export const daysSince: number = Math.floor(+difference / millisecondsPerDay)
