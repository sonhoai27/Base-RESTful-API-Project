import * as express from 'express';
import controller from './statuses.controller';
import { add, detailById } from './statuses.middleware';
import { filter, pagination } from '../utils/route';
const router = express.Router();

router.get('/', filter, pagination, controller.getStatuses);
router.post('/', add, controller.createStatus);

router.param('id', detailById);

router.get('/:id', controller.statusById);
router.put('/:id', add, controller.updateStatus);
router.delete('/:id', controller.deleteStatus);

export default router;
