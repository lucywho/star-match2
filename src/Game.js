import { utils, startArray } from "./utils"
import { useGameState } from "./useGameState"
import PlayAgain from "./components/PlayAgain"
import PlayNumber from "./components/PlayNumber"
import StarsDisplay from "./components/StarsDisplay"

function Game(props) {
    const { stars, availableNums, candidateNums, secondsLeft, setGameState } =
        useGameState()
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

        setGameState(newCandidateNums)
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
                                onClick={props.newGame}
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
