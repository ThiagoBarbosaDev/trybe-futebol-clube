import { Router } from 'express';
import { TeamsService } from '../services';
import { TeamsController } from '../controllers';

const teamsRouter = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouter.route('/').get((req, res) => teamsController.findAll(req, res));
teamsRouter.route('/:id').get((req, res) => teamsController.findOne(req, res));

export default teamsRouter;
