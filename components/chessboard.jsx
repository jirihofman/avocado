import React from 'react';

// pieces is an array of objects with the following structure:
// {
// square: eg. 'e4' or 'a5'
// piece: eg. '♞' or '♝'
// }
export default function ChessBoard({ pieces, result }) {

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
            // let classBorder = 'border border-0';
            let newCss = {};
            let id = 0;
            // check if there is a piece in this square
            for (let i = 0; i < pieces.length; i++) {
                const piecePosition = convertPositionToRowCol(pieces[i].square);
                if (piecePosition.row === row && piecePosition.col === col) {
                    piece = pieces[i].piece;
                    id = i;
                    // Moving my piece from e4 to the first existing piece
                    if (result?.ok && i === 0) {
                        // Css for my piece. Will be added to the piece.
                        // addCssAnimation();

                    } else if (result?.ok && i === 1) {
                        // Correct answer piece
                        // classBorder = 'border border-2 border-primary';
                    } else {
                        // invisible border
                        newCss = {
                            visibility: 'visible',
                        };
                    }

                    break;
                } else {
                    id = undefined;
                }
            }

            squares.push(
                <div key={`${row}-${col}`} className={`square ${isWhiteSquare ? 'white' : 'black'}`}>
                    {/* Render pieces here */}
                    <div id={'piece-' + id} className={'piece'} style={newCss}>{piece}</div>
                </div>
            );
        }
    }

    if (result?.ok) {
        // Add css for the animation
        setTimeout(() => {
            addCssAnimation();
        }, 0);
    } else {
        // Remove the animation css
        const myPiece = document.getElementById('piece-0');
        if (myPiece) {
            myPiece.style = '';
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
}

function addCssAnimation() {

    const myPiece = document.getElementById('piece-0');
    const correctAnswerPiece = document.getElementById('piece-1');

    // calculate the distance between the two pieces
    const myPieceRect = myPiece.getBoundingClientRect();
    const correctAnswerPieceRect = correctAnswerPiece.getBoundingClientRect();
    const dx = correctAnswerPieceRect.x - myPieceRect.x;
    const dy = correctAnswerPieceRect.y - myPieceRect.y;

    // Make my piece move visibly
    myPiece.style = [
        'z-index: 1',
        // make the piece move visibly
        `transform: translate(${dx}px, ${dy}px)`,
        'transition: all 2s ease-in-out'
    ].join(';');

    // Make the correct answer piece disappear after 2 seconds
    setTimeout(() => {
        correctAnswerPiece.style = 'visibility: hidden';
    }, 2000);
}
