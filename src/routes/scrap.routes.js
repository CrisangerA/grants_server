import { Router } from 'express';
import { getDataFromWebsite } from '../controllers/scrap.controller';
const router = Router();

router.get('/buildata', async (req, res) => {
  let grants = await getDataFromWebsite();
  console.log(grants.length);
  res.json(grants);
});

export default router;