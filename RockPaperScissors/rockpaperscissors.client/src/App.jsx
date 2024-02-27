import React, { useState, useEffect } from 'react';
import rockImage from './assets/rock.png';
import paperImage from './assets/paper.png';
import scissorsImage from './assets/scissors.png';
import Confetti from 'react-confetti';
import './App.css';

function App() {
    const [playerChoice, setPlayerChoice] = useState('rock');
    const [computerChoice, setComputerChoice] = useState('rock');
    const [result, setResult] = useState(null);
    const [playerWins, setPlayerWins] = useState(0);
    const [computerWins, setComputerWins] = useState(0);
    const [showResetButton, setShowResetButton] = useState(false);
    const [choicesDisabled, setChoicesDisabled] = useState(false);
    const [bodyFilter, setBodyFilter] = useState('none');

    const choices = [
        { type: 'rock', img: 'https://raw.githubusercontent.com/praxeds/theodinproject-rock-paper-scissors/main/assets/images/raised-fist_270a.png' },
        { type: 'paper', img: 'https://raw.githubusercontent.com/praxeds/theodinproject-rock-paper-scissors/main/assets/images/hand-with-fingers-splayed_1f590-fe0f.png' },
        { type: 'scissors', img: 'https://raw.githubusercontent.com/praxeds/theodinproject-rock-paper-scissors/main/assets/images/victory-hand_270c-fe0f.png' }
    ];
    useEffect(() => {
        document.body.style.filter = bodyFilter;
    }, [bodyFilter]);

    const handlePlayerChoice = async (choice) => {
        if (choicesDisabled) return; // Si las elecciones están deshabilitadas, no hacer nada

        setPlayerChoice(choice);
        const response = await fetch('/api/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ choice })
        });
        const data = await response.json();
        setComputerChoice(data.computerChoice);
        setResult(data.result);
        setPlayerWins(data.playerWins);
        setComputerWins(data.computerWins);

        if (data.playerWins === 3 || data.computerWins === 3) {
            // Si uno de los dos llega a 3 victorias, mostrar el botón de reset y deshabilitar las elecciones
            setShowResetButton(true);
            setChoicesDisabled(true);

            if (data.computerWins === 3) {
                setBodyFilter('grayscale(100%)'); // Aplicar escala de grises al cuerpo si el jugador pierde
            }
        }
    };

    const resetGame = async () => {
        try {
            const response = await fetch('/api/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Restablecer los contadores en el estado local
                setPlayerWins(0);
                setComputerWins(0);
                setShowResetButton(false);
                setChoicesDisabled(false);
                setBodyFilter('none');
            } else {
                console.error('Error al restablecer el juego.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <>
        <h1>Rock,<br/> Paper,<br/> Scissors!</h1>
        <div className="container">
            {playerWins === 3 && <Confetti />} {/* Mostrar confeti si el jugador alcanza 3 victorias */}
            <div className="result-container">
                <div className="user-result-element result-move">
                    <img src={playerChoice === 'rock' ? rockImage : (playerChoice === 'paper' ? paperImage : scissorsImage)} alt={playerChoice} />
                    <p>YOU<br></br> {playerWins}</p>
                </div>
                <div className="computer-result-element result-move">
                    <img src={computerChoice === 'rock' ? rockImage : (computerChoice === 'paper' ? paperImage : scissorsImage)} alt={computerChoice} />
                    <p>RIVAL<br></br> {computerWins}</p>
                </div>
            </div>

                {playerWins === 3 && <p className="game-status-element">You've won!😄</p>}
                {computerWins === 3 && <p className="game-status-element">You've' lost!😫</p>}

            <div className="move-select-menu">
                {choices.map(({ type, img }) => (
                    <button key={type} className={`${type}-move move`} onClick={() => handlePlayerChoice(type)} disabled={choicesDisabled}>
                        <img src={img} alt={type} className="select-move-icon" />
                        <p className="move-select-name">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    </button>
                ))}
            </div>

                {showResetButton && <button className="reset-btn" onClick={resetGame}>Play again</button>}
            </div>
            <footer className="footer">
                <p>Made by <a href="https://github.com/yolanda-moreno" target="_blank">Yolanda Moreno</a></p>
            </footer>
        </>
    );
}

export default App;
