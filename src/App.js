import Game from "./Game"
import { useState } from "react"

function App() {
    const [gameId, setGameid] = useState(1)

    function newGame() {
        setGameid(gameId + 1)
    }
    return (
        <div className="App">
            <Game key={gameId} newGame={newGame} />
        </div>
    )
}

export default App
