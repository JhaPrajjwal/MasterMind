import { Board } from './enums'
import Constants from './consts'

/**
 * Returns the default value of a Game Board.
 */
export const getDefaultBoardData = (): Board[] => {
    let data = new Array<Board>(Constants.NUMBER_ROWS)
    for(var i=0; i<Constants.NUMBER_ROWS; i++) {
        data[i] = {
            turn: i+1,
            selectedBalls: [-1, -1, -1, -1],
            rightlyPlacedColors: null,
            wronglyPlacedColors: null
        }
	}
	data[0].selectedBalls = [0, 0, 0, 0]
    return data
}

/**
 * Returns a new sequence of colors choosen by the computer.
 */
export const newComputerSequence = (): number[] => {
	let seq: number[] = [...Array(Constants.NUMBER_BALLS_IN_ROW)]
	const min = 1
    const max = Constants.TOTAL_BALLS + 1

    for(var i=0; i<Constants.NUMBER_BALLS_IN_ROW; i++) {
        seq[i] = Math.floor(Math.random() * (max - min)) + min
    }
	return seq
}