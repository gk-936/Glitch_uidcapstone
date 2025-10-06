import { useEffect, useRef } from 'react';

interface GameCanvasProps {
  gameCode: string;
  width?: number;
  height?: number;
}

export const GameCanvas = ({ gameCode, width = 800, height = 400 }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!gameCode || !canvasRef.current) return;

    try {
      // Create a safe execution environment
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;

      // Execute the game code in a controlled way
      const gameFunction = new Function('document', gameCode);
      gameFunction({
        getElementById: (id: string) => id === 'gameCanvas' ? canvas : null,
        addEventListener: (event: string, handler: Function) => {
          if (event === 'keydown') {
            const keyHandler = (e: KeyboardEvent) => handler(e);
            document.addEventListener('keydown', keyHandler);
            return () => document.removeEventListener('keydown', keyHandler);
          }
        }
      });
    } catch (error) {
      console.error('Game execution error:', error);
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Error - Check Console', width / 2, height / 2);
      }
    }
  }, [gameCode, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border rounded-lg bg-gray-900"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};