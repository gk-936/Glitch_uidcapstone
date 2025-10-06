interface Sprite {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

interface GameGenerationRequest {
  prompt: string;
  selectedSprites: Record<string, Sprite>;
}

interface GeneratedGame {
  title: string;
  description: string;
  gameCode: string;
  sprites: {
    character: string;
    enemy: string;
    background: string;
    item: string;
  };
  tags: string[];
}

export class AIService {
  private static readonly API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  private static readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  static async generateGame(request: GameGenerationRequest): Promise<GeneratedGame> {
    if (!this.API_KEY) {
      return this.generateGameFallback(request);
    }

    try {
      const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a game developer AI. Create a complete HTML5 Canvas game based on this prompt: "${request.prompt}"

Use these sprites: ${JSON.stringify(request.selectedSprites)}

Return ONLY a JSON object with this exact structure:
{
  "title": "Game Title",
  "description": "Game description",
  "gameCode": "complete JavaScript code for HTML5 canvas game",
  "tags": ["tag1", "tag2"]
}

The gameCode should:
- Use canvas with id 'gameCanvas'
- Be a complete, playable game
- Include keyboard controls (arrow keys)
- Use the provided sprites
- Have collision detection
- Show score
- Be fun and interactive

Make the game match the prompt theme and be actually playable.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from response
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      const aiResponse = JSON.parse(jsonMatch[0]);

      return {
        title: aiResponse.title,
        description: aiResponse.description,
        gameCode: aiResponse.gameCode,
        sprites: request.selectedSprites,
        tags: aiResponse.tags || ['ai-generated']
      };
    } catch (error) {
      console.error('Gemini generation failed, using fallback:', error);
      return this.generateGameFallback(request);
    }
  }

  static async enhanceGame(gameCode: string, enhancement: string): Promise<string> {
    if (!this.API_KEY) {
      return this.enhanceGameFallback(gameCode, enhancement);
    }

    try {
      const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Modify this HTML5 Canvas game code based on the user request.

Current game code:
${gameCode}

User request: ${enhancement}

Return ONLY the modified JavaScript code, nothing else. Keep it as a complete, working game.`
            }]
          }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 2048,
          }
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini enhancement failed, using fallback:', error);
      return this.enhanceGameFallback(gameCode, enhancement);
    }
  }

  private static generateGameFallback(request: GameGenerationRequest): GeneratedGame {
    const prompt = request.prompt.toLowerCase();
    
    let title = "Generated Game";
    let description = "An AI-generated game experience";
    let tags: string[] = ["ai-generated"];

    if (prompt.includes("space") || prompt.includes("alien") || prompt.includes("rocket")) {
      title = "Space Adventure";
      description = "Navigate through space, battle aliens, and collect cosmic treasures";
      tags = ["space", "action", "adventure"];
    } else if (prompt.includes("platform") || prompt.includes("jump")) {
      title = "Platform Quest";
      description = "Jump through challenging platforms and collect power-ups";
      tags = ["platformer", "arcade", "adventure"];
    } else if (prompt.includes("puzzle") || prompt.includes("match")) {
      title = "Puzzle Master";
      description = "Solve challenging puzzles and match colorful blocks";
      tags = ["puzzle", "strategy", "casual"];
    }

    const gameCode = this.generateGameCode(request.selectedSprites);

    return {
      title,
      description,
      gameCode,
      sprites: request.selectedSprites,
      tags
    };
  }

  private static generateGameCode(sprites: Record<string, Sprite>): string {
    const character = sprites.Characters?.emoji || '🎮';
    const enemy = sprites.Characters?.emoji || '👾';
    const item = sprites.Items?.emoji || '💎';

    return `
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 400;
    
    this.player = { x: 100, y: 200, sprite: "${character}", speed: 5 };
    this.enemies = [];
    this.items = [];
    this.score = 0;
    this.keys = {};
    
    this.init();
  }
  
  init() {
    this.spawnEnemies();
    this.spawnItems();
    this.setupControls();
    this.gameLoop();
  }
  
  setupControls() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });
    document.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }
  
  spawnEnemies() {
    for(let i = 0; i < 3; i++) {
      this.enemies.push({
        x: 400 + i * 150,
        y: Math.random() * 300 + 50,
        sprite: "${enemy}",
        speed: 1 + Math.random()
      });
    }
  }
  
  spawnItems() {
    for(let i = 0; i < 5; i++) {
      this.items.push({
        x: Math.random() * 700 + 50,
        y: Math.random() * 300 + 50,
        sprite: "${item}",
        collected: false
      });
    }
  }
  
  update() {
    if(this.keys['ArrowUp']) this.player.y = Math.max(30, this.player.y - this.player.speed);
    if(this.keys['ArrowDown']) this.player.y = Math.min(370, this.player.y + this.player.speed);
    if(this.keys['ArrowLeft']) this.player.x = Math.max(0, this.player.x - this.player.speed);
    if(this.keys['ArrowRight']) this.player.x = Math.min(770, this.player.x + this.player.speed);
    
    this.enemies.forEach(enemy => {
      enemy.x -= enemy.speed;
      if(enemy.x < -50) enemy.x = 850;
    });
    
    this.items.forEach(item => {
      if(!item.collected && 
         Math.abs(this.player.x - item.x) < 30 && 
         Math.abs(this.player.y - item.y) < 30) {
        item.collected = true;
        this.score += 10;
      }
    });
  }
  
  render() {
    this.ctx.clearRect(0, 0, 800, 400);
    this.ctx.fillStyle = '#87CEEB';
    this.ctx.fillRect(0, 0, 800, 400);
    
    this.ctx.font = '30px Arial';
    this.ctx.fillText(this.player.sprite, this.player.x, this.player.y);
    
    this.enemies.forEach(enemy => {
      this.ctx.fillText(enemy.sprite, enemy.x, enemy.y);
    });
    
    this.items.forEach(item => {
      if(!item.collected) {
        this.ctx.fillText(item.sprite, item.x, item.y);
      }
    });
    
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Score: ' + this.score, 10, 30);
    this.ctx.fillText('Use arrow keys to move', 10, 380);
  }
  
  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }
}

new Game();`;
  }

  private static enhanceGameFallback(gameCode: string, enhancement: string): string {
    if (enhancement.includes("faster") || enhancement.includes("speed")) {
      return gameCode.replace("speed: 5", "speed: 8").replace("speed: 1", "speed: 3");
    } else if (enhancement.includes("more enemies")) {
      return gameCode.replace("i < 3", "i < 6");
    } else if (enhancement.includes("more items")) {
      return gameCode.replace("i < 5", "i < 10");
    }
    
    return gameCode + "\n// Enhanced by AI";
  }
}