import * as express from 'express';
import controller from './categories.controller';
import { pagination, add, detailById } from './categories.middleware';
const router = express.Router();

router.get('/', pagination, controller.getCategories);
router.post('/', add, controller.createCategory);

router.param('id', detailById);

router.get('/:id', controller.categoryById);
router.put('/:id', add, controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

export default router;
