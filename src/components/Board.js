import { useState } from "react"
import "./Board.css"
import Square from "./Square"

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))

    const onSquareClick = (i) => {
        if (squares[i] || calculateWinner(squares)) return

        const nextSquare = squares.slice()
        xIsNext ? nextSquare[i] = "X" : nextSquare[i] = "0"
        setSquares(nextSquare)
        setXIsNext(!xIsNext)
    }

    const winner = calculateWinner(squares)
    let status
    winner ? status = `Winner: ${winner}!` : status = `Next player: ${xIsNext ? "X" : "0"}`
    return (
        <>
            <div className="status">{status}</div>
            <div className="board">
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
                </div>
            </div>
        </>
    )
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}