export type Player = {
  id: string;
  name: string;
};

export type GameLog = {
  id: number;
  type: string;
  players: Player[];
};
