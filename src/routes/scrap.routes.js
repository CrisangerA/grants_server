import { Router } from 'express';
import { dropGrants, registerGrants } from '../controllers/grants.controller';
import { getDataFromWebsite, getDetailFromGrant } from '../controllers/scrap.controller';

const router = Router();

router.get('/buildata', async (req, res) => {
  let grants = await getDataFromWebsite();
  const rs = await dropGrants();
  console.log(rs);
  await registerGrants(grants);
  console.log(grants.length);
  return res.json(grants);
});

router.post('/detail', async (req, res) => {
  const oppid = req.body.oppId;
  console.log(oppid);
  let detail = await getDetailFromGrant(oppid);
  return res.json(detail);
});
export default router;