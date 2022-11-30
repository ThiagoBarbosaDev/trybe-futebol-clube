import { Router } from 'express';
import { LeaderBoardService, MatchesService } from '../services';
import { LeaderBoardController } from '../controllers';

const leaderBoardRouter = Router();

const matchesService = new MatchesService();
const leaderBoardService = new LeaderBoardService(matchesService);
const leaderBoardController = new LeaderBoardController(leaderBoardService);

leaderBoardRouter.route('/home')
  .get((req, res) => leaderBoardController.findHomeLeaderBoard(req, res));
leaderBoardRouter.route('/away')
  .get((req, res) => leaderBoardController.findAwayLeaderBoard(req, res));

export default leaderBoardRouter;
