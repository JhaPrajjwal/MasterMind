import React from 'react'
import { Modal, Button } from 'react-bootstrap'

type Props = {
    show: boolean,
    onHide: () => void
}

function Rules(props: Props) {
    const rules = [
        "The aim is to guess the ordered sequence of colored balls which is pre-decided by the computer.",
        "You will have 10 chances at Max.",
        "To place a ball in a slot, select the appropriate color ball from the bottom bar. After that," +
        "select the slot in which you want to place the selected ball.",
        "Once all the four balls are placed in the current chance, click on check.",
        "The results are displayed for the current chance.",
        "The game ends when all the balls are correctly placed, or all the chances are over."
    ]

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Rules of the Game
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ul> {rules.map((item: string, idx: number) => <li key={idx}>{item}</li>)} </ul>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Rules