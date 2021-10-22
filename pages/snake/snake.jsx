import Layout from "../../components/layout"
import SnakeStyles from "../../styles/snake.module.css"
import { useState, useEffect, useRef } from "react"
import { useInterval } from "../../utils/interval";
import Typography from '@mui/material/Typography';


export const canvas_size = { x: 800, y: 800 };
export const snake_start = [{ x: 8, y: 7 }, { x: 8, y: 8 }];
export const direction_start = { x: 0, y: -1 };
export const apple_start = { x: 8, y: 3 };
export const scale = 40;
export const initial_speed = 200;
export const directions = {
   ArrowUp: { x: 0, y: -1 },
   ArrowDown: { x: 0, y: 1 },
   ArrowLeft: { x: -1, y: 0 },
   ArrowRight: { x: 1, y: 0 },
};
const maxPoints = 1600;

export default function Snake(){
   const canvasRef = useRef(null);
   const wrapperRef = useRef(null);
   const [direction, setDirection] = useState(direction_start);
   const [snake, setSnake] = useState(snake_start);
   const [apple, setApple] = useState(apple_start);
   const [speed, setSpeed] = useState(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [gameOver, setGameOver] = useState(false);
   const [points, setPoints] = useState(0);
   const [hasFinishedGame, setHasFinishedGame] = useState(false);
   

   useEffect(() => {
      const context = canvasRef.current?.getContext('2d');
      if (context == null) throw new Error('Could not get context');
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, canvas_size.x, canvas_size.y);
      // Draw Snake
      context.fillStyle = 'green';
      snake.forEach(({ x, y }) => context.fillRect(x, y, 1, 1));
      // Draw Apple
      context.fillStyle = 'red';
      context.fillRect(apple.x, apple.y, 1, 1);
   }, [snake, apple]);

   const startGame = () => {
      setHasFinishedGame(false);
      setIsPlaying(true);
      setPoints(0);
      setSnake(snake_start);
      setApple(apple_start);
      setDirection(direction_start);
      setSpeed(initial_speed);
      setGameOver(false);
      wrapperRef.current?.focus();
   };

   const endGame = () => {
      setIsPlaying(false);
      setSpeed(null);
      setGameOver(true);
   };

   const moveSnake = (event) => {
      const { key } = event;
      // only if arrow key move
      if (key === 'ArrowUp' || key === 'ArrowDown' ||
       key === 'ArrowRight' || key === 'ArrowLeft'){
            // disable backwards key, this means no collision when going right, and then pressing ArrowLeft
         if ( direction.x + directions[key].x &&
            direction.y + directions[key].y) {
            setDirection(directions[key]);
         }
      }
   };

   const gameLoop = () => {
      const snakeCopy = [...snake]; // Create shallow copy to avoid mutating array
      const newSnakeHead = {
        x: snakeCopy[0].x + direction.x,
        y: snakeCopy[0].y + direction.y,
      };
      snakeCopy.unshift(newSnakeHead);
      if (checkCollision(newSnakeHead)) endGame();
      if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
      setSnake(snakeCopy);
   };

   const checkCollision = (piece, snoko = snake) => {
      // Wall Collision Detection
      if (
        piece.x * scale >= canvas_size.x ||
        piece.x < 0 ||
        piece.y * scale >= canvas_size.y ||
        piece.y < 0
      ) {
        return true;
      }
      for (const segment of snoko) {
         if (piece.x === segment.x && piece.y === segment.y) return true;
      }
      return false;
   };

   const checkAppleCollision = (newSnake) => {
      if (newSnake[0].x === apple.x && newSnake[0].y === apple.y) {
        let newApple = createRandomApple();
        while (checkCollision(newApple, newSnake)) {
          newApple = createRandomApple();
        }
        
         setApple(newApple);
         setPoints(points + 1);
         if (points === maxPoints) {
            setHasFinishedGame(true);
            endGame();
         }
        return true;
      }
      return false;
   };

   const createRandomApple = () => {
      return {
        x: Math.floor((Math.random() * canvas_size.x - 10) / scale),
        y: Math.floor((Math.random() * canvas_size.y - 10) / scale),
      };
   };

   
   useInterval(() => gameLoop(), speed);

   return (
      <Layout>
         <div className="wrapper">
            <Typography variant="h5">Classic Snake Game </Typography>
            <div
               ref={wrapperRef}
               className={SnakeStyles.canvas}
               role="button"
               tabIndex="0"
               onKeyDown={(event) => moveSnake(event)}
               >
               {gameOver && <div className={SnakeStyles.gameOver}>Game Over</div>}
               <canvas
                  style={gameOver
                     ? { border: '1px solid black', opacity: 0.5 }
                     : { border: '1px solid black' }}
                  ref={canvasRef}
                  width={canvas_size.x}
                  height={canvas_size.y}
               />
               {!isPlaying && (
                  <button className={SnakeStyles.start} onClick={startGame}>
                     Start Game
                  </button>
               )}
               {hasFinishedGame && <p className={SnakeStyles.finishedGame}>You finished the game!</p>}
               <p className={SnakeStyles.points}>{points}</p>
            </div>
         </div>
      </Layout>)
}