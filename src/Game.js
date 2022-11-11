import PlayNumber from "./components/PlayNumber"
import PlayAgain from "./components/PlayAgain"
import StarsDisplay from "./components/StarsDisplay"
import { utils, startArray } from "./utils"
import { useEffect, useState } from "react"

function Game() {
    const [stars, setStars] = useState(utils.random(1, startArray.length))
    const [availableNums, setAvailableNums] = useState(startArray)
    const [candidateNums, setCandidateNums] = useState([])
    const [secondsLeft, setSecondsLeft] = useState(startArray.length + 1)

    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
            }, 1000)
            return () => clearTimeout(timerId)
        }
    })

    const candidatesAreWrong = utils.sum(candidateNums) > stars

    const gameStatus =
        availableNums.length === 0
            ? "won"
            : secondsLeft === 0
            ? "lost"
            : "active"

    function getNumberStatus(number) {
        if (!availableNums.includes(number)) {
            return "used"
        }

        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? "wrong" : "candidate"
        }

        return "available"
    }

    function onNumberClick(number, currentStatus) {
        if (currentStatus === "used") {
            return
        }

        const newCandidateNums =
            currentStatus === "available"
                ? candidateNums.concat(number)
                : candidateNums.filter((can) => can !== number)

        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums)
        } else {
            const newAvailableNums = availableNums.filter(
                (num) => !newCandidateNums.includes(num)
            )

            setAvailableNums(newAvailableNums)
            setCandidateNums([])
            setStars(utils.randomSumIn(newAvailableNums, startArray.length))
        }
    }

    //holding function - do this in App
    function resetGame() {
        setStars(utils.random(1, startArray.length))
        setAvailableNums(startArray)
        setCandidateNums([])
        setSecondsLeft(startArray.length + 1)
    }

    return (
        <div>
            <header>Game Here</header>
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        {gameStatus === "active" ? (
                            <StarsDisplay stars={stars} />
                        ) : (
                            <PlayAgain
                                onClick={resetGame}
                                gameStatus={gameStatus}
                            />
                        )}
                    </div>
                    <div className="right">
                        {utils.range(1, startArray.length).map((number) => (
                            <PlayNumber
                                key={number}
                                number={number}
                                status={getNumberStatus(number)}
                                onClick={onNumberClick}
                            />
                        ))}
                    </div>
                </div>
                <div className="timer">
                    Time remaining: {secondsLeft} seconds
                </div>
            </div>
        </div>
    )
}

export default Game
