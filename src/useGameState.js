import { useState, useEffect } from "react"
import { utils, startArray } from "./utils"

export const useGameState = () => {
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

    const setGameState = (newCandidateNums) => {
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

    const candidatesAreWrong = utils.sum(candidateNums) > stars
    const gameStatus =
        availableNums.length === 0
            ? "won"
            : secondsLeft === 0
            ? "lost"
            : "active"

    return {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        candidatesAreWrong,
        gameStatus,
        setGameState,
    }
}
