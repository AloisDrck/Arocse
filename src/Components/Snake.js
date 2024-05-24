import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/_snake.scss'; // Assurez-vous d'inclure le CSS approprié pour le style
import { Button, IconButton, Paper, TextField, styled } from '@mui/material';
import { Delete, PlayArrowRounded } from '@mui/icons-material';
import theme from '../styles/theme';
import axios from 'axios';

const GRID_SQUARE_ROOT = 40;
const TILE_WIDTH = 15;

const WHITE = "white";
const BLACK = "black";
const RED = "red";

const EMPTY = 0;
const SNAKE = 1;
const FRUIT = 2;

const LAST_LINE_FIRST = GRID_SQUARE_ROOT * (GRID_SQUARE_ROOT - 1);
const FIRST_LINE_LAST = GRID_SQUARE_ROOT - 1;

const UP = -GRID_SQUARE_ROOT;
const DOWN = GRID_SQUARE_ROOT;
const RIGHT = 1;
const LEFT = -1;

function getRandomIndex(tiles) {
    let idx = Math.floor(Math.random() * GRID_SQUARE_ROOT * GRID_SQUARE_ROOT);
    while (true) {
        if (tiles[idx].nature === EMPTY) {
            return idx;
        }
        idx += 1;
        if (idx >= GRID_SQUARE_ROOT * GRID_SQUARE_ROOT) {
            idx = 0;
        }
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Snake {
    constructor() {
        this.head = null;
        this.tail = null;
        this.direction = 0;
        this.length = 0;
    }

    eat(idx, tiles) {
        const newNode = new Node(idx);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.next = newNode;
            this.head = newNode;
        }
        const tile = tiles[idx];
        tile.nature = SNAKE;
        tile.style = { ...tile.style, background: BLACK };
    }

    grow() {
        this.length++;
    }

    move(tiles) {
        if (this.length < tiles.length) {
            const oldTailIdx = this.tail.value;
            this.tail = this.tail.next;
            tiles[oldTailIdx].nature = EMPTY;
            tiles[oldTailIdx].style = { ...tiles[oldTailIdx].style, background: WHITE };
        }
    }
}

function willHitWall(idx, direction) {
    if (idx <= FIRST_LINE_LAST && direction === UP) {
        return true;
    }
    if (idx >= LAST_LINE_FIRST && direction === DOWN) {
        return true;
    }
    const mod = idx % GRID_SQUARE_ROOT;
    if (mod === GRID_SQUARE_ROOT - 1 && direction === RIGHT) {
        return true;
    }
    if (mod === 0 && direction === LEFT) {
        return true;
    }
    return false;
}

const SnakeGame = () => {
    const [tiles, setTiles] = useState([]);
    const [snake, setSnake] = useState(new Snake());
    const [playing, setPlaying] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [hoveredScoreId, setHoveredScoreId] = useState(null);
    const gridRef = useRef(null);
    const intervalId = useRef(null);

    const init = useCallback(() => {
        const newTiles = [];
        for (let i = 0; i < GRID_SQUARE_ROOT; i++) {
            for (let j = 0; j < GRID_SQUARE_ROOT; j++) {
                newTiles.push({
                    style: {
                        width: `${TILE_WIDTH}px`,
                        border: "1px solid black",
                        background: WHITE,
                    },
                    nature: EMPTY,
                });
            }
        }

        const newSnake = new Snake();
        const idx = Math.floor(GRID_SQUARE_ROOT / 2) + Math.floor(GRID_SQUARE_ROOT / 2) * GRID_SQUARE_ROOT;

        newSnake.eat(idx - 1, newTiles);
        newSnake.eat(idx, newTiles);
        newSnake.length = 2;
        newSnake.direction = RIGHT;

        const fruitIdx = idx - GRID_SQUARE_ROOT * Math.floor(GRID_SQUARE_ROOT / 4);
        newTiles[fruitIdx].nature = FRUIT;
        newTiles[fruitIdx].style = { ...newTiles[fruitIdx].style, background: RED };

        setTiles(newTiles);
        setSnake(newSnake);
    }, []);

    useEffect(() => {
        init();
        fetchLeaderboard();
    }, [init]);

    const move = useCallback(() => {
        if (!playing) return;

        const nextIndex = snake.head.value + snake.direction;
        const nextTile = tiles[nextIndex];

        if (willHitWall(snake.head.value, snake.direction) || nextTile.nature === SNAKE) {
            setPlaying(false);
            clearInterval(intervalId.current);
            setCurrentScore(snake.length - 2);
            alert("Game Over!\nVotre score : " + (snake.length - 2));
            setPlayerName(user.name);
            setShowInput(true);
            init();
            return;
        }

        if (nextTile.nature === FRUIT) {
            snake.grow();
            const fruitIdx = getRandomIndex(tiles);
            tiles[fruitIdx].nature = FRUIT;
            tiles[fruitIdx].style = { ...tiles[fruitIdx].style, background: RED };
        } else {
            snake.move(tiles);
        }

        snake.eat(nextIndex, tiles);
        setTiles([...tiles]); // Trigger re-render
    }, [playing, snake, tiles, init]);

    const handleKeyDown = useCallback((event) => {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "ArrowDown":
                if (snake.direction !== UP) {
                    setSnake((prevSnake) => {
                        const newSnake = Object.assign(Object.create(Object.getPrototypeOf(prevSnake)), prevSnake);
                        newSnake.direction = DOWN;
                        return newSnake;
                    });
                }
                break;
            case "ArrowUp":
                if (snake.direction !== DOWN) {
                    setSnake((prevSnake) => {
                        const newSnake = Object.assign(Object.create(Object.getPrototypeOf(prevSnake)), prevSnake);
                        newSnake.direction = UP;
                        return newSnake;
                    });
                }
                break;
            case "ArrowLeft":
                if (snake.direction !== RIGHT) {
                    setSnake((prevSnake) => {
                        const newSnake = Object.assign(Object.create(Object.getPrototypeOf(prevSnake)), prevSnake);
                        newSnake.direction = LEFT;
                        return newSnake;
                    });
                }
                break;
            case "ArrowRight":
                if (snake.direction !== LEFT) {
                    setSnake((prevSnake) => {
                        const newSnake = Object.assign(Object.create(Object.getPrototypeOf(prevSnake)), prevSnake);
                        newSnake.direction = RIGHT;
                        return newSnake;
                    });
                }
                break;
            case " ":
                setPlaying((prevPlaying) => !prevPlaying);
                setShowInput(false)
                break;
            default:
                return;
        }
        event.preventDefault();
    }, [snake]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (playing) {
            intervalId.current = setInterval(move, 45); // Appel de move toutes les secondes
        } else {
            clearInterval(intervalId.current);
        }
        return () => clearInterval(intervalId.current); // Cleanup on unmount or when playing changes
    }, [playing, move]);

    const handleNameChange = (e) => {
        setPlayerName(e.target.value);
    };

    const handleSubmitScore = async () => {
        try {
            await axios.post('http://arocseback.cluster-ig3.igpolytech.fr/api/scores', { playerName, score: currentScore });
            setShowInput(false);
            console.log("ajout nouveau score", playerName, currentScore);
            setPlayerName('');
            fetchLeaderboard(); // Mettre à jour le leaderboard après avoir soumis le score
            init(); // Réinitialiser le jeu après avoir soumis le score

        } catch (error) {
            console.error("Error submitting score:", error);
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('http://arocseback.cluster-ig3.igpolytech.fr/api/scores');
            setLeaderboard(response.data);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    };

    const deleteScore = async (id) => {
        try {
            console.log("suppression du score : ", id);
            await axios.delete(`http://arocseback.cluster-ig3.igpolytech.fr/api/scores/${id}`);
            fetchLeaderboard(); // Mettre à jour le leaderboard après la suppression
        } catch (error) {
            console.error("Error deleting score:", error);
        }
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://arocseback.cluster-ig3.igpolytech.fr/api/user', { withCredentials: true });

                console.log(response);

                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        color: theme.palette.color1.main,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',  // Centrer horizontalement
        alignItems: 'center',  // Centrer verticalement
        height: '744px'
    }));

    const Pause = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        borderRadius: '20px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '684px',
        height: '744px'
    }));

    const LeaderB = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'left',
        borderRadius: '20px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.color1.main,
        color: '#F0F0F0',
        fontSize: '1.2rem',
        lineHeight: '40px'
    }));

    const SubmitButton = styled(Button)(({ theme }) => ({
        backgroundColor: theme.palette.color3.main,
        '&:hover': {
            backgroundColor: theme.palette.color3.dark,
        },
        color: theme.palette.white.main
    }));


    return (
        <div style={{ paddingTop: '100px', position: 'relative' }}>
            <Item elevation={24} style={{ position: 'absolute', top: 100, left: 375 }} theme={theme}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <h1>Appuyez sur ESPACE</h1>
                    <h2>{snake.length - 2}</h2>
                </div>
                <div ref={gridRef} id="my_grid" className="square_grid" style={{ gridTemplateColumns: `repeat(${GRID_SQUARE_ROOT}, 1fr)` }}>
                    {tiles.map((tile, index) => (
                        <div key={index} className="tile" style={tile.style}></div>
                    ))}
                </div>
                <p>Utilisez les flèches pour changer de direction.</p>
            </Item>
            {!playing && (
                <Pause onClick={() => (setPlaying((prevPlaying) => !prevPlaying), setShowInput(false))} style={{ position: 'absolute', top: 100, left: 375 }}>
                    <PlayArrowRounded style={{ fontSize: '12rem' }} />
                </Pause>
            )}


            {showInput && (
                <Paper style={{ position: 'absolute', top: 200, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', padding: '30px', backgroundColor: '#F0F0F0' }} elevation={24}>
                    <h4 style={{ color: '#3C486B' }}>Voulez-vous enregistrer votre score ?</h4><br></br>
                    <TextField
                        variant='outlined'
                        type="text"
                        value={playerName}
                        onChange={handleNameChange}
                        placeholder='Entrez votre nom'
                        style={{ padding: '10px', fontSize: '16px' }}
                    />
                    <SubmitButton onClick={handleSubmitScore} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px', marginTop: '14px' }} theme={theme}>
                        Submit Score
                    </SubmitButton>
                </Paper>
            )}


            <LeaderB style={{ position: 'absolute' }} theme={theme}>
                <h2>Leaderboard</h2><br></br>
                <ul>
                    {leaderboard.map((score, index) => (
                        <li key={index} onMouseEnter={() => setHoveredScoreId(score._id)} onMouseLeave={() => setHoveredScoreId(null)}>
                            {score.playerName} : {score.score}
                            {hoveredScoreId === score._id && (
                                <IconButton onClick={() => deleteScore(score._id)} style={{ marginLeft: '10px' }}>
                                    <Delete />
                                </IconButton>
                            )}
                        </li>
                    ))}
                </ul>
            </LeaderB>
        </div>
    );
};

export default SnakeGame;

