/**
 * Response interface for standings api
 */
export interface Standings {
  get: string;
  parameters: {
    league: string;
    season: string;
  },
  errors: [];
  results: number;
  paging: {
    current: number;
    total: number;
  },
  response: [
    {
      league: {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
        standings: [Team[]];
      }
    }
  ]
}

/**
 * Team data interface in standings
 */
export interface Team {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    }
  }
  home: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    }
  }
  away: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    }
  }
  update: string;
}

