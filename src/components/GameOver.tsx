import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Score } from '../enums'
import { FaSadCry, FaSmile } from 'react-icons/fa'

type Props = {
    show: boolean,
    result: boolean,
    score: Score
    onHide: () => void
}

function GameOver(props: Props) {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.result ?
                    (<div>
                        <FaSmile
                            color="#343a40"
                            size={'2rem'}
                        />
                        You Won !!!
                    </div>) :
                    (<div>
                        <FaSadCry
                            color="#343a40"
                            size={'2rem'}
                        />
                        You Lost !
                    </div>)}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.result ? 
                (<div>
                    You won the game using{' '}
                    {props.score.turns} turns in{' '}
                    {props.score.time === null ? '-': props.score.time.minutes} Minutes{' '}
                    {props.score.time === null ? '-': props.score.time.seconds} Seconds
                </div>) :
                (<div>Better Luck Next Time</div>)}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GameOver
