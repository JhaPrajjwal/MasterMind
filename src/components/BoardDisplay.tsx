import React from 'react'
import { BsCircleFill } from 'react-icons/bs'
import { Table } from 'react-bootstrap'

import { Board } from '../enums'
import Constants from '../consts'


type Props = {
    data: Board[],
    play: (index: number) => void 
}

function BoardDisplay(props: Props) {
    const getBoardRow = (row: number[]): any => {
		if(row[0] === -1) {
			return <div></div>
		}

		return (
			<div>
				{
					row.map((ele, idx) =>
						<BsCircleFill
							key={idx}
							color={ele === 0 ? 'grey' : Constants.COLORS[ele-1]}
							size='1.5rem'
							style={{marginLeft:'10%'}}
							onClick={() => props.play(idx)}
						/>
					)
				}
			</div>
		)
    }

    return (
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
                    props.data.map((row: any, idx: number) => 
                        <tr key={idx}>
                            <td>{row.turn}</td>
                            <td>{getBoardRow(row.selectedBalls)}</td>
                            <td>{row.rightlyPlacedColors}</td>
                            <td>{row.wronglyPlacedColors}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    )
}

export default BoardDisplay
