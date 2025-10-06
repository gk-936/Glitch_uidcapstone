export const mockGames = [
  {
    id: '1',
    title: 'Space Adventure',
    description: 'A thrilling space exploration game where you pilot a rocket through asteroid fields',
    authorName: 'Game Creator',
    sprites: {
      character: '🚀',
      enemy: '👾',
      background: '🌌',
      item: '⭐'
    },
    isPublished: true,
    plays: 142,
    likes: 35,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: '2',
    title: 'Jungle Quest',
    description: 'Explore the mysterious jungle and discover ancient treasures',
    authorName: 'Adventure Dev',
    sprites: {
      character: '🧗',
      enemy: '🐍',
      background: '🌴',
      item: '💎'
    },
    isPublished: true,
    plays: 89,
    likes: 22,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: '3',
    title: 'Ocean Explorer',
    description: 'Dive deep into the ocean and meet fascinating sea creatures',
    authorName: 'Aqua Studios',
    sprites: {
      character: '🤿',
      enemy: '🦈',
      background: '🌊',
      item: '🐚'
    },
    isPublished: true,
    plays: 67,
    likes: 18,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: '4',
    title: 'Castle Defense',
    description: 'Defend your medieval castle from waves of enemies',
    authorName: 'Medieval Games',
    sprites: {
      character: '🏰',
      enemy: '⚔️',
      background: '🏔️',
      item: '🛡️'
    },
    isPublished: true,
    plays: 203,
    likes: 45,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: '5',
    title: 'Pizza Runner',
    description: 'Deliver pizzas across the city in this fast-paced arcade game',
    authorName: 'Food Games Inc',
    sprites: {
      character: '🍕',
      enemy: '🚗',
      background: '🏙️',
      item: '💰'
    },
    isPublished: true,
    plays: 156,
    likes: 31,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: '6',
    title: 'Robot Factory',
    description: 'Build and program robots in this futuristic puzzle game',
    authorName: 'Tech Innovators',
    sprites: {
      character: '🤖',
      enemy: '⚡',
      background: '🏭',
      item: '🔧'
    },
    isPublished: true,
    plays: 94,
    likes: 27,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: '7',
    title: 'Magic Forest',
    description: 'Cast spells and solve puzzles in an enchanted forest',
    authorName: 'Mystic Games',
    sprites: {
      character: '🧙',
      enemy: '🐺',
      background: '🌲',
      item: '🔮'
    },
    isPublished: true,
    plays: 78,
    likes: 19,
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: '8',
    title: 'Desert Racer',
    description: 'Race through sand dunes in this high-speed adventure',
    authorName: 'Speed Demons',
    sprites: {
      character: '🏎️',
      enemy: '🌵',
      background: '🏜️',
      item: '🏁'
    },
    isPublished: true,
    plays: 112,
    likes: 24,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: '9',
    title: 'My Draft Game',
    description: 'A work-in-progress platformer game',
    authorName: 'Game Creator',
    sprites: {
      character: '🎮',
      enemy: '❓',
      background: '⬜',
      item: '💡'
    },
    isPublished: false,
    plays: 5,
    likes: 1,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: '10',
    title: 'Test Game',
    description: 'Testing new game mechanics',
    authorName: 'Game Creator',
    sprites: {
      character: '🧪',
      enemy: '🔬',
      background: '🏢',
      item: '📊'
    },
    isPublished: false,
    plays: 2,
    likes: 0,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

export const mockUser = {
  id: '1',
  email: 'user@example.com',
  username: 'Game Creator'
};
