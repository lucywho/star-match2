import PlayNumber from "./components/PlayNumber"
import StarsDisplay from "./components/StarsDisplay"
import { utils, startArray } from "./utils"
import { useState } from "react"

function Game() {
    const [stars, setStars] = useState(utils.random(1, startArray.length))
    const [availableNums, setAvailableNums] = useState(startArray)

    return (
        <div>
            <header>Game Here</header>
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        {/* <>play again or stars</> */}
                        <StarsDisplay stars={stars} />
                    </div>
                    <div className="right">
                        {utils.range(1, startArray.length).map((number) => (
                            <PlayNumber key={number} number={number} />
                        ))}
                    </div>
                </div>
                <div className="timer">Time remaining: seconds</div>
            </div>
        </div>
    )
}

export default Game
