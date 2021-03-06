import React, {useState, useEffect} from 'react'
import { BsClockFill } from 'react-icons/bs'
import { Time } from '../enums'

type Props = {
    start: boolean,
    getTimeElapsed: (time: Time) => void
}

function Timer(props: Props) {
    const defaultTime: Time = { minutes: 0, seconds: 0}
    const [timeElapsed, changeTimeElapsed] = useState<Time>(defaultTime)

    const { start } = props

    useEffect(() => {
        if(!props.start) {
            props.getTimeElapsed(timeElapsed)
            changeTimeElapsed(defaultTime)
            return ;
        }

        const interval = setInterval(() => {
            changeTimeElapsed((prevState: Time) => ({
                minutes: prevState.seconds === 59 ? prevState.minutes + 1: prevState.minutes,
                seconds: prevState.seconds === 59 ? 0 : prevState.seconds + 1,
            }))
        }, 1000);

        return () => clearInterval(interval);
    }, [start])

    const { minutes, seconds } = timeElapsed

    return (
        <div>
            <BsClockFill
				color="#343a40"
				size={'3rem'}
			/>
            <h2>Time Elapsed:</h2>
            <h2>
                {minutes < 10 ? `0${minutes.toString()}` : minutes}: 
                {seconds < 10 ? `0${seconds.toString()}` : seconds} 
            </h2>
        </div>
    )
}

export default Timer
