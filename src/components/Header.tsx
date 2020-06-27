import React, { useState } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GiBrain } from 'react-icons/gi'

import Rules from './Rules'

function Header() {
    const [ modalShow, setModalShow ] = useState(false)

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className='m-auto'>
                    <h1>
                    <GiBrain
                        color="white"
                        size={'3rem'}
                        style={{marginRight:'4px'}}
                    />
                    MasterMind
                    </h1>
                </Navbar.Brand>

                <Button variant="light" onClick={() => setModalShow(true)}>
                    Rules
                </Button>

                <Rules
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Navbar>
        </div>
    )
}

export default Header
