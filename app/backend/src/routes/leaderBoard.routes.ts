import { Router } from 'express';
import { LeaderBoardService } from '../services';
import { LeaderBoardController } from '../controllers';

const leaderBoardRouter = Router();

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

leaderBoardRouter.route('/').get((req, res) => leaderBoardController.findAll(req, res));

export default leaderBoardRouter;
