import { User } from '@/types';

const splitPlayers = (players: User[]) => {
  const playerSplit: { [key: string]: User[] } = { top: [], bottom: [], left: [], right: [] };
  let lastSplit = '';

  players.map((player, index) => {
    if (index === 2) {
      return playerSplit.left.push(player);
    }
    if (index === 3) {
      return playerSplit.right.push(player);
    }
    if (lastSplit === '' || lastSplit === 'top') {
      lastSplit = 'bottom';
      return playerSplit.bottom.push(player);
    }
    lastSplit = 'top';
    return playerSplit.top.push(player);
  });

  return playerSplit;
};

export default splitPlayers;
