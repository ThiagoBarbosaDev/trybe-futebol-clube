import { ILeaderBoardResponse, IMatchesResponse } from '../interfaces';
import MatchesService from './matches.service';

export default class LeaderBoardService {
  private efficiency:number;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance: number;
  private data: ILeaderBoardResponse[];

  constructor(private matchesService:MatchesService) {
    this.matchesService = matchesService;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
    this.data = [];
  }

  sortTeams = (a:ILeaderBoardResponse, b:ILeaderBoardResponse) =>
    b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn;

  async findHomeLeaderBoard():Promise<ILeaderBoardResponse[]> {
    const teamData = await this.matchesService.findHomeOrAwayData('teamHome');
    const leaderBoardData = teamData.map((team) => team.toJSON()) as IMatchesResponse[];
    const nameList = leaderBoardData.map((matchData) => matchData.teamHome.teamName);
    const uniqueNameSet = new Set(nameList);
    [...uniqueNameSet]
      .forEach((teamName) => this.handleHomeLeaderBoardCalculation(teamName, leaderBoardData));
    this.data.sort(this.sortTeams);
    console.log('FINDHOME');
    console.table(this.data);
    const response = [...this.data];
    this.data = [];
    return response;
  }

  async findAwayLeaderBoard():Promise<ILeaderBoardResponse[]> {
    const teamData = await this.matchesService.findHomeOrAwayData('teamAway');
    const leaderBoardData = teamData.map((team) => team.toJSON()) as IMatchesResponse[];
    const nameList = leaderBoardData.map((matchData) => matchData.teamAway.teamName);
    const uniqueNameSet = new Set(nameList);
    [...uniqueNameSet]
      .forEach((teamName) => this.handleAwayLeaderBoardCalculation(teamName, leaderBoardData));
    this.data.sort(this.sortTeams);
    console.log('FINDAWAY');
    console.table(this.data);
    const response = [...this.data];
    this.data = [];
    return response;
  }

  handleHomeLeaderBoardCalculation = (
    teamName:string,
    leaderBoardData:IMatchesResponse[],
  ):void => {
    leaderBoardData
      .filter((match) => match.teamAway.teamName === teamName)
      .forEach((match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          this.totalVictories += 1; this.totalPoints += 3;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          this.totalDraws += 1; this.totalPoints += 1;
        } else (this.totalLosses += 1);
        this.goalsFavor += match.homeTeamGoals;
        this.goalsOwn += match.awayTeamGoals;
        this.totalGames += 1;
      });
    this.setData(teamName);
    this.resetState();
  };

  handleAwayLeaderBoardCalculation = (
    teamName:string,
    leaderBoardData:IMatchesResponse[],
  ):void => {
    leaderBoardData
      .filter((match) => match.teamAway.teamName === teamName)
      .forEach((match) => {
        if (match.homeTeamGoals < match.awayTeamGoals) {
          this.totalVictories += 1; this.totalPoints += 3;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          this.totalDraws += 1; this.totalPoints += 1;
        } else (this.totalLosses += 1);
        this.goalsFavor += match.awayTeamGoals;
        this.goalsOwn += match.homeTeamGoals;
        this.totalGames += 1;
      });
    this.setData(teamName);
    this.resetState();
  };

  setData(teamName:string) {
    this.data = [...this.data, {
      name: teamName,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2)),
    }];
  }

  resetState() {
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
  }

  // .reduce((acc, cv) => ({
  //   name: teamName,
  //   totalPoints: acc.totalPoints + this.handlePoints(cv.homeTeamGoals, cv.awayTeamGoals),
  //   totalGames: acc.totalGames + 1,
  //   totalVictories: acc.totalVictories + this.handlePoints(cv.homeTeamGoals, cv.awayTeamGoals),
  //   totalDraws: acc.totalDraws + this.handleDraw(cv.homeTeamGoals, cv.awayTeamGoals),
  //   totalLosses: acc.totalLosses + this.handleDefeat(cv.homeTeamGoals, cv.awayTeamGoals),
  //   goalsFavor: acc.goalsFavor + cv.homeTeamGoals,
  //   goalsOwn: acc.goalsOwn + cv.awayTeamGoals,
  //   goalsBalance: 0 + cv.awayTeamGoals + cv.homeTeamGoals,
  //   efficiency: (acc.totalPoints + this.handlePoints(cv.homeTeamGoals, cv.awayTeamGoals) / (acc.totalGames)),
  // }), INITIAL_STATE);

  handlePoints = (homeTeamGoals:number, awayTeamGoals:number):number => {
    if (homeTeamGoals > awayTeamGoals) { return 3; }
    if (homeTeamGoals === awayTeamGoals) { return 1; }
    return 0;
  };

  handleVictory = (
    homeTeamGoals:number,
    awayTeamGoals:number,
  ):number => (homeTeamGoals > awayTeamGoals ? 1 : 0);

  handleDefeat = (
    homeTeamGoals:number,
    awayTeamGoals:number,
  ):number => (homeTeamGoals < awayTeamGoals ? 1 : 0);

  handleDraw = (
    homeTeamGoals:number,
    awayTeamGoals:number,
  ):number => (homeTeamGoals === awayTeamGoals ? 1 : 0);
}
// - `Classificação`: Posição na classificação;
// - `Time`: Nome do time;
// - `P`: Total de Pontos;
// - `J`: Total de Jogos;
// - `V`: Total de Vitórias;
// - `E`: Total de Empates;
// - `D`: Total de Derrotas;
// - `GP`: Gols marcados a favor;
// - `GC`: Gols sofridos;
// - `SG`: Saldo total de gols;
// - `%`: Aproveitamento do time.

// const leaderboard = {
//   "name": "Palmeiras",
//   "totalPoints": 13,
//   "totalGames": 5,
//   "totalVictories": 4,
//   "totalDraws": 1,
//   "totalLosses": 0,
//   "goalsFavor": 17,
//   "goalsOwn": 5,
//   "goalsBalance": 12,
//   "efficiency": 86.67
// },

// return [data].reduce((acc:Record<string, string>, cv) => ({
//   ...acc,
// P: 'teste',
// J: 'teste',
// V: 'teste',
// E: 'teste',
// D: 'teste',
// GP: 'teste',
// GC: 'teste',
// SG: 'teste',
// '%': 'teste',
// }), {});
