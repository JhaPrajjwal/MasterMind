import React, { Component } from 'react'
import { ProgressBar, Table, Container, Row, Col, Button } from 'react-bootstrap'
import { BsCircleFill } from 'react-icons/bs'

import GameOver from './GameOver'
import BestScore from './BestScore'
import Timer from './Timer'
import { Time, Score } from '../enums'


type State = {
    disableGameButton: boolean,
    gameScore: Score,
    gameResult: boolean
    gameOverModal: boolean,
    startTimer: boolean
    turn: number,
    boardData: any,
    selectedBall: string,
    sequence: number[]
}

type Props = {}

export class GameBoard extends Component<Props, State> {
    private colors = ['white', 'blue', 'red', 'green', 'yellow', 'pink', 'lightblue', 'maroon']
    constructor(props: Props) {
        super(props)
    
        this.state = {
            disableGameButton: false,
            gameScore: { turns: 0, time: null },
            gameResult: false,
            gameOverModal: false,
            startTimer: false,
            turn: 1,
            boardData: getDefaultBoardData(),
            selectedBall: '_',
            sequence: newSequence()
        }
    }

    getBoardRow = (row: number[]): any => {
		if(row[0] === -1) {
			return <div></div>
		}

		return (
			<div>
				{
					row.map((ele, idx) =>
						<BsCircleFill
							key={idx}
							color={ele === 0 ? 'grey' : this.colors[ele-1]}
							size='1.5rem'
							style={{marginLeft:'10%'}}
							onClick={() => this.play(idx)}
						/>
					)
				}
			</div>
		)
    }
    
    play = (idx: number): void => {
		if(this.state.selectedBall === '_') {
			return ;
		}

		let newData = [...this.state.boardData]
        newData[this.state.turn-1].selectedBalls[idx] = this.colors.indexOf(this.state.selectedBall) + 1
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
        let isDisabled = false
        let sequence = this.state.sequence
        console.log(guess, this.state.sequence)
        
		for(var i=0; i<4; i++) {
			if(guess[i] === 0) {
				isDisabled = true
				break
			}

			if(sequence[i] === guess[i]) {
				visited[i] = 1
				rightPlaced++
			}
		}

		if(isDisabled) {
			return ;
		}

		for(var i=0; i<4; i++) {
			if(sequence[i] !== guess[i]) {
				for(var j=0; j<4; j++) {
					if(!visited[j] && sequence[j] === guess[i]) {
						visited[j] = 1
						rightColor++
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
            }), () => {
                this.setState((prevState) => ({
                    ...prevState,
                    gameResult: true,
                    gameOverModal: true,
                    boardData: getDefaultBoardData(),
                    sequence: newSequence(),
                    startTimer: false,
                    disableGameButton: false,
                    turn: 1
                }))
            })
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
                gameResult: false,
                gameOverModal: true,
                boardData: getDefaultBoardData(),
                sequence: newSequence(),
                startTimer: false,
                disableGameButton: false,
                turn: 1
            }))
		}
	}
    
    render() {
        return (
            <div>
                <GameOver
                    show={this.state.gameOverModal}
                    result={this.state.gameResult}
                    score={this.state.gameScore}
                    onHide={() => {
                        this.setState((prevState) => ({
                            ...prevState,
                            gameOverModal: false
                        }))
                    }}
                />

                <Container fluid style={{marginTop:20}}>
                    <Row>
                        <Col>
                            <BestScore score={this.state.gameScore} />
                        </Col>

                        <Col xs={6}>
                            <ProgressBar animated now={(this.state.turn-1) * 10} />
                            <Table bordered variant="dark" style={{marginTop:10}}>
                                <thead>
                                    <tr>
                                        <th style={{width:"10%"}}>Turn</th>
                                        <th style={{width:"50%"}}>Board</th>
                                        <th style={{width:"20%"}}>Right Colors and Correctly Placed</th>
                                        <th style={{width:"20%"}}>Right Colors but Wrongly Placed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.boardData.map((row: any, idx: number) => 
                                            <tr key={idx}>
                                                <td>{row.turn}</td>
                                                <td>{this.getBoardRow(row.selectedBalls)}</td>
                                                <td>{row.rightlyPlacedColors}</td>
                                                <td>{row.wronglyPlacedColors}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>

                            <Button
                                variant="dark" 
                                onClick={() => this.startGame()}
                                style={{marginRight:'5px'}}
                                disabled={this.state.disableGameButton}>
                                Start Game
                            </Button>

                            <Button
                                variant="dark"
                                onClick={() => this.check()}
                                disabled={!this.state.disableGameButton}>
                                Check
                            </Button>

                            <div style={{
                                    backgroundColor: '#343a40',
                                    color:'white',
                                    paddingBottom:20,
                                    marginTop:20}}>

                                <h4>Select a Ball:</h4>
                                {
                                    this.colors.map((element, idx) => 
                                        <BsCircleFill
                                            key={idx}
                                            color={element}
                                            size={this.state.selectedBall === element ? '2.2rem' : '1.5rem'}
                                            style={{marginLeft:'5%'}}
                                            onClick={() => {
                                                this.setState((prevState) => ({
                                                    ...prevState,
                                                    selectedBall: element
                                                }))
                                            }}
                                        />
                                    )
                                }
                            </div>
                        </Col>

                        <Col>
                            <Timer
                                start={this.state.startTimer}
                                getTimeElapsed={(time: Time) => {
                                    this.setState((prevState) => ({
                                        ...prevState,
                                        gameScore: {
                                            ...prevState.gameScore,
                                            time: time
                                        }
                                    }))
                                }}
                            />
					    </Col>
                    </Row>
                </Container>      
            </div>
        )
    }
}

export default GameBoard


const getDefaultBoardData = (): any => {
    let data: any[] = []
    for(var i=0; i<10; i++) {
        data.push({
            turn: i+1,
            selectedBalls: [-1, -1, -1, -1],
            rightlyPlacedColors: null,
            wronglyPlacedColors: null
        })
	}
	data[0].selectedBalls = [0, 0, 0, 0]
    return data
}

const newSequence = (): number[] => {
	let seq: number[] = []
	const min = 1
	const max = 9
	for(var i=0; i<4; i++) {
		seq.push(Math.floor(Math.random() * (max - min)) + min)
	}
	return seq
}