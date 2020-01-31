import express from 'express';

import seasonsRouter from './seasons';
import categoriesRouter from './categories';
import tabsRouter from './tabs';
import fieldsRouter from './fields';

const router = express.Router();
router.use('/seasons', seasonsRouter);
router.use('/categories', categoriesRouter);
router.use('/tabs', tabsRouter);
router.use('/fields', fieldsRouter);

export default router;