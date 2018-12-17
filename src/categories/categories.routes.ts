import { filter, pagination } from '@app/utils/route';
import * as express from 'express';
import controller from './categories.controller';
import { add, detailById } from './categories.middleware';
const router = express.Router();

router.get('/', filter, pagination, controller.getCategories);
router.post('/', add, controller.createCategory);

router.param('id', detailById);

router.get('/:id', controller.categoryById);
router.put('/:id', add, controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

export default router;
