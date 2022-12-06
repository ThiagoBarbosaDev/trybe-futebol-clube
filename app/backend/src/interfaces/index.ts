import MatchesModel from '../database/models/MatchesModel';

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

export interface IMatchesResponse extends MatchesModel {
  teamHome: {
    id: number;
    teamName: string;
  }
  teamAway: {
    id: number;
    teamName: string;
  }
}

export interface ILeaderBoardResponse {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
