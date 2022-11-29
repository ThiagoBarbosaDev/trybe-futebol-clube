export interface ILoginBody {
  email: string;
  password: string;
}

export interface IMatchesPost {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
