import { Router } from 'express';
import { getAllGrants } from '../controllers/grants.controller';

const router = Router();

router.get('/grants', async (req, res) => {
  let result = await getAllGrants();
  return res.json(result);
});

export default router;