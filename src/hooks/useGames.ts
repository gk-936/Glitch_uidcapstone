import { useState, useEffect } from 'react';
import { mockGames } from '@/lib/mockData';

// Simplified Game interface
export interface Game {
  id: string;
  title: string;
  description: string;
  authorName: string;
  sprites: {
    character: string;
    enemy: string;
    background: string;
    item: string;
  };
  isPublished: boolean;
  plays: number;
  likes: number;
  createdAt: string;
}

export const useGames = () => {
  const [games] = useState(mockGames);
  const [loading, setLoading] = useState(false);

  const getPublishedGames = (limit?: number) => {
    const published = games.filter(game => game.isPublished);
    return limit ? published.slice(0, limit) : published;
  };

  const getUserGames = () => {
    return games.filter(game => game.authorName === 'Game Creator');
  };

  const searchGames = (searchTerm: string) => {
    if (!searchTerm) return [];
    return games.filter(game => 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return null;
    return {
      ...game,
      author: game.authorName,
      createdAt: new Date(game.createdAt).toLocaleDateString(),
      isLiked: false,
      sprites: {
        character: game.sprites.character,
        enemy: game.sprites.enemy,
        background: game.sprites.background,
        item: game.sprites.item
      }
    };
  };

  const incrementPlays = (gameId: string) => {
    // Mock increment plays
    console.log('Incrementing plays for game:', gameId);
  };

  return {
    games,
    loading,
    getPublishedGames,
    getUserGames,
    searchGames,
    getGame,
    incrementPlays,
  };
};