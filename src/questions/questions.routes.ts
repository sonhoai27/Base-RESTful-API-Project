import * as express from 'express';
import controller from './questions.controller';
import { add, detailById, pagination, filter } from './questions.middleware';
const router = express.Router();

router.get('/', filter, pagination, controller.getQuestions);
router.post('/', add, controller.createQuestion);

router.param('id', detailById);

router.get('/:id', controller.questionById);
router.put('/:id', add, controller.updateQuestion);
router.delete('/:id', controller.deleteQuestion);

export default router;
