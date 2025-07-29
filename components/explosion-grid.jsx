'use client';

import { useState, useEffect } from 'react';
import { emojisplosion } from 'emojisplosion';

// Themed emoji collections
const emojiThemes = {
    food: ['🍎', '🍌', '🍕', '🍔', '🍟', '🌭', '🥙', '🌮', '🍗', '🍖', '🥩', '🧀', '🥐', '🍞', '🥖', '🥨', '🥯', '🧈'],
    vehicles: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🏍️', '🚲', '🛴', '🚁', '✈️'],
    faces: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦'],
    nature: ['🌸', '🌺', '🌻', '🌷', '🌹', '🌲', '🌳', '🌴', '🌵', '🌿', '🍀', '🍁', '🍂', '🍃', '☀️', '🌙', '⭐', '🌟']
};

const themeNames = Object.keys(emojiThemes);

export default function ExplosionGrid({ onExplosion, regenerateKey }) {
    // Generate a random 3x3 grid with themed columns
    const generateGrid = () => {
        const themes = [
            themeNames[Math.floor(Math.random() * themeNames.length)],
            themeNames[Math.floor(Math.random() * themeNames.length)],
            themeNames[Math.floor(Math.random() * themeNames.length)]
        ];
        
        const grid = [];
        for (let row = 0; row < 3; row++) {
            const gridRow = [];
            for (let col = 0; col < 3; col++) {
                const theme = themes[col];
                const themeEmojis = emojiThemes[theme];
                const emoji = themeEmojis[Math.floor(Math.random() * themeEmojis.length)];
                gridRow.push({ emoji, theme, row: row + 1, col });
            }
            grid.push(gridRow);
        }
        return grid;
    };

    const [grid, setGrid] = useState(generateGrid);

    // Regenerate grid when regenerateKey changes
    useEffect(() => {
        setGrid(generateGrid());
    }, [regenerateKey]);

    const handleCellClick = (event, cell) => {
        const { emoji, theme, row } = cell;
        const themeEmojis = emojiThemes[theme];
        
        // Calculate emoji count based on row (1: fewest, 3: most)
        const baseCount = row === 1 ? 10 : row === 2 ? 20 : 30;
        const clickedEmojiCount = Math.floor(baseCount * 0.6); // Predominant emoji
        const themeEmojiCount = Math.floor(baseCount * 0.4); // Other theme emojis
        
        // Create explosion with the clicked emoji predominating
        const explosionEmojis = [];
        
        // Add the clicked emoji multiple times
        for (let i = 0; i < clickedEmojiCount; i++) {
            explosionEmojis.push(emoji);
        }
        
        // Add other emojis from the same theme
        for (let i = 0; i < themeEmojiCount; i++) {
            const randomThemeEmoji = themeEmojis[Math.floor(Math.random() * themeEmojis.length)];
            explosionEmojis.push(randomThemeEmoji);
        }
        
        emojisplosion({
            emojis: explosionEmojis,
            emojiCount: baseCount,
            position: () => ({
                x: event.clientX || window.innerWidth / 2,
                y: event.clientY || 100,
            }),
        });
        
        if (onExplosion) {
            onExplosion({ emoji, theme, row });
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
            {grid.map((row, rowIndex) => 
                row.map((cell, colIndex) => (
                    <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={(e) => handleCellClick(e, cell)}
                        style={{
                            fontSize: '3rem',
                            padding: '20px',
                            border: '2px solid #ddd',
                            borderRadius: '10px',
                            backgroundColor: '#f8f9fa',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            minHeight: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#e9ecef';
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f8f9fa';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        {cell.emoji}
                    </button>
                ))
            )}
        </div>
    );
}