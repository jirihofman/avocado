import React from 'react';

// pieces is an array of objects with the following structure:
// {
// square: eg. 'e4' or 'a5'
// piece: eg. '♞' or '♝'
// }
const ChessBoard = ({ pieces }) => {
    const boardSize = 8; // Size of the chessboard
    const squares = [];

    // convert string position to row and col
    const convertPositionToRowCol = (position) => {
        const col = position.charCodeAt(0) - 97;
        const row = 8 - parseInt(position[1]);
        return { row, col };
    };

    // Create the chessboard squares with alternating colors
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const isWhiteSquare = (row + col) % 2 === 0;
            let piece = <span style={{ visibility: 'hidden' }}>♙</span>;
            // check if there is a piece in this square
            for (let i = 0; i < pieces.length; i++) {
                const piecePosition = convertPositionToRowCol(pieces[i].square);
                if (piecePosition.row === row && piecePosition.col === col) {
                    piece = pieces[i].piece;
                    break;
                }
            }

            squares.push(
                <div key={`${row}-${col}`} className={`square ${isWhiteSquare ? 'white' : 'black'}`}>
                    {/* Render pieces here */}
                    <div className='piece'>{piece}</div>
                </div>
            );
        }
    }

    return (
        <div className="container">
            <div className="row ">
                <div className="col-8">
                    <div className="chessboard border border-1">
                        {squares}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChessBoard;
