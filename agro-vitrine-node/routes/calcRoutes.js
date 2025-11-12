import express from 'express';
import { ensureAuth } from '../middleware/auth.js';
import { getCalculadora, postNPK, postDiluicao } from '../controllers/calcController.js';

const router = express.Router();

router.get('/', ensureAuth, getCalculadora);
router.post('/npk', ensureAuth, postNPK);
router.post('/diluicao', ensureAuth, postDiluicao);

export default router;
