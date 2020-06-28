import React, { Component } from 'react'
import { ProgressBar, Container, Row, Col, Button } from 'react-bootstrap'
import { BsCircleFill } from 'react-icons/bs'

import BestScore from './BestScore'
import BoardDisplay from './BoardDisplay'
import GameOver from './GameOver'
import Timer from './Timer'

import { Time, Score, Board } from '../enums'
import { newComputerSequence, getDefaultBoardData } from '../helper'
import Constants from '../consts'

type State = {
    disableGameButton: boolean,
    gameScore: Score,
    gameResult: boolean
    gameOverModal: boolean,
    startTimer: boolean
    turn: number,
    boardData: Board[],
    selectedBall: string | null,
    sequence: number[]
}

export class GameBoard extends Component<{}, State> {
    constructor(props: {}) {
        super(props)
    
        this.state = {
            disableGameButton: false,
            gameScore: { turns: 0, time: null },
            gameResult: false,
            gameOverModal: false,
            startTimer: false,
            turn: 1,
            boardData: getDefaultBoardData(),
            selectedBall: null,
            sequence: newComputerSequence(),
        }
    }
    
    play = (idx: number): void => {
		if(this.state.selectedBall === null) {
			return ;
		}

		let newData = [...this.state.boardData]
        newData[this.state.turn-1].selectedBalls[idx] = 
            Constants.COLORS.indexOf(this.state.selectedBall) + 1

        this.setState((prevState) => ({
            ...prevState,
            boardData: newData
        }))
    }
    
    startGame = (): void => {
        this.setState((prevState) => ({
            ...prevState,
            startTimer: true,
            disableGameButton: true,
            gameScore: { turns: 0, time: null }
        }))
    }
    
    check = (): void => {
		let guess = this.state.boardData[this.state.turn-1].selectedBalls
		let rightPlaced: number = 0
		let rightColor: number = 0
		let visited = new Array(4).fill(0)
        let sequence = this.state.sequence
        console.log(sequence, guess)
		for(var i=0; i<4; i++) {
			if(guess[i] === 0)
				return ;

			if(sequence[i] === guess[i]) {
				visited[i] = 1
				rightPlaced++
			}
		}

		for(i=0; i<4; i++) {
			if(sequence[i] !== guess[i]) {
				for(var j=0; j<4; j++) {
					if(!visited[j] && sequence[j] === guess[i]) {
						visited[j] = 1
                        rightColor++
                        break;
					}
				}
			}
		}

		let newData = [...this.state.boardData]
		newData[this.state.turn-1].rightlyPlacedColors = rightPlaced
		newData[this.state.turn-1].wronglyPlacedColors = rightColor

		if(rightPlaced === 4) {
            this.setState((prevState) => ({
                ...prevState,
                gameScore: {
                    ...prevState.gameScore,
                    turns: prevState.turn
                }
            }), () => this.resetBoard(true))
		}
		else if(this.state.turn !== 10) {
            newData[this.state.turn].selectedBalls = [0, 0, 0, 0]
            this.setState((prevState) => ({
                ...prevState,
                boardData: newData,
                turn: prevState.turn + 1
            }))
		}
		else {
            this.setState((prevState) => ({
                ...prevState,
                gameScore: {
                    time: null,
                    turns: 0
                }
            }), () => this.resetBoard(false))
		}
    }
    
    resetBoard = (result: boolean): void => {
        this.setState((prevState) => ({
            ...prevState,
            gameResult: result,
            gameOverModal: true,
            boardData: getDefaultBoardData(),
            sequence: newComputerSequence(),
            startTimer: false,
            disableGameButton: false,
            turn: 1
        }))
    }
    
    render() {
        const { gameOverModal, gameResult, gameScore, turn, boardData,
            disableGameButton, selectedBall, startTimer } = this.state

        return (
            <div>
                <GameOver
                    show={gameOverModal}
                    result={gameResult}
                    score={gameScore}
                    onHide={() => this.setState((prevState) => ({
                        ...prevState,
                        gameOverModal: false
                    }))}
                />

                <Container fluid style={{marginTop:20}}>
                    <Row>
                        <Col><BestScore score={gameScore} /></Col>

                        <Col xs={6}>
                            <ProgressBar animated now={(turn-1) * 10} />

                            <BoardDisplay data={boardData} play={this.play} />

                            <Button
                                variant="dark" 
                                onClick={() => this.startGame()}
                                style={{marginRight:'5px'}}
                                disabled={disableGameButton}>
                                Start Game
                            </Button>

                            <Button
                                variant="dark"
                                onClick={() => this.check()}
                                disabled={!disableGameButton}>
                                Check
                            </Button>

                            <div style={{
                                    backgroundColor: '#343a40',
                                    color:'white',
                                    paddingBottom:20,
                                    marginTop:20}}>

                                <h4>Select a Ball:</h4>
                                {Constants.COLORS.map((element, idx) => 
                                    <BsCircleFill
                                        key={idx}
                                        color={element}
                                        size={selectedBall === element ? '2.2rem' : '1.5rem'}
                                        style={{marginLeft:'5%'}}
                                        onClick={() => this.setState((prevState) => ({
                                            ...prevState,
                                            selectedBall: element
                                        }))}
                                    />
                                )}
                            </div>
                        </Col>

                        <Col>
                            <Timer
                                start={startTimer}
                                getTimeElapsed={
                                    (time: Time) => this.setState((prevState) => ({
                                        ...prevState,
                                        gameScore: {
                                            ...prevState.gameScore,
                                            time: time
                                        }
                                    }))
                                }
                            />
					    </Col>
                    </Row>
                </Container>      
            </div>
        )
    }
}

export default GameBoard

