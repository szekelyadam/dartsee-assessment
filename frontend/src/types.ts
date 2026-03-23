export type Player = {
  id: string;
  name: string;
};

export type Game = {
  id: number;
  type: string;
};

export type GameLog = Game & {
  players: Player[];
};

export type PlayerPerformance = Player & {
  averageScorePerRound: number;
  missCount: number;
};

export type GameDetails = Game & {
  players: PlayerPerformance[];
};

export type GameStatsResponseGame = {
  type: string;
  count: number;
  percentage: number;
};

export type GameStatsResponse = {
  totalGames: number;
  games: GameStatsResponseGame[];
};

export type GameStatsRender = Omit<GameStatsResponse, "games"> & {
  games: (GameStatsResponseGame & {
    name: string;
    fill: string;
  })[];
};
