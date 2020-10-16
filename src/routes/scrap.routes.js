import { Router } from 'express';
import { registerGrants } from '../controllers/grants.controller';
import { getDataFromWebsite, getDetailFromGrant } from '../controllers/scrap.controller';

const router = Router();

router.get('/buildata', async (req, res) => {
  let grants = await getDataFromWebsite();
  await registerGrants(grants);
  console.log(grants.length);
  return res.json(grants);
});

router.post('/detail', async (req, res) => {
  const oppid = req.body.oppid;
  let detail = await getDetailFromGrant(oppid);
  return res.json(detail);
});
export default router;