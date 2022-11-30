import { Router } from 'express';
import { MatchesService } from '../services';
import { MatchesController } from '../controllers';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.route('/:id/finish')
  .patch((req, res) => matchesController.finishMatch(req, res));
matchesRouter.route('/:id/')
  .patch((req, res) => matchesController.update(req, res));
matchesRouter.route('/')
  .get((req, res) => matchesController.findAll(req, res))
  .post((req, res) => matchesController.insert(req, res));

export default matchesRouter;
