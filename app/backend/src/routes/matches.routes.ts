import { Router } from 'express';
import { MatchesService } from '../services';
import { MatchesController } from '../controllers';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.route('/').get((req, res) => matchesController.findAll(req, res));

export default matchesRouter;
