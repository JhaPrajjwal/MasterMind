import React, { useState } from 'react'
import { GrScorecard } from 'react-icons/gr'

import { Score } from '../enums'

type Props = {
    score: Score
}

function BestScore(props: Props) {
    const [bestScore, updatebestScore] = useState<Score>({ turns: 0, time: null })

    if(bestScore.turns === 0 || bestScore.time === null) {
        if(props.score.turns !== 0 && props.score.time !== null) {
            updatebestScore(props.score)
        }
    }
    else if(props.score.time !== null && bestScore.time !== null) {
        let turns = props.score.turns
        let time = props.score.time 

        if(turns < bestScore.turns ||
            (turns === bestScore.turns &&
                (time.minutes < bestScore.time.minutes ||
                    (time?.minutes === bestScore.time.minutes &&
                        time.seconds < bestScore.time.seconds)))) {
                            updatebestScore(props.score)
                        }
    }

    return (
        <div>
            <GrScorecard
				color="#343a40"
				size={'3rem'}
			/>
            <h2>Best Score:</h2> 
			<h3>
                Turns:{' '}
                <span style={{fontSize:'25px'}}>
                    {bestScore.turns === 0 ? '-': bestScore.turns }
                </span>
            </h3>
            <h3>Time:{' '}
                <span style={{fontSize:'20px'}}>
                    {bestScore.time === null ? '-': bestScore.time.minutes} Minutes{': '}
                    {bestScore.time === null ? '-': bestScore.time.seconds} Seconds
                </span>
            </h3>
        </div>
    )
}

export default BestScore
