import { Router } from 'express';
import { posterRouter } from './poster-routes.js';
import { detailsRouter } from './details-routes.js';

const router = Router();

router.use('/posters', posterRouter);
router.use('/details', detailsRouter);

export default router;
