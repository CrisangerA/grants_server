import { Router } from 'express';
import { getAllGrants, getGrants } from '../controllers/grants.controller';

const router = Router();


router.get('/grants', async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  let result;
  if (!!page && !!limit) {
    //console.log('Diferente Undefined');
    result = await getGrants(page, limit);
    return res.json(result);
  }
  result = await getAllGrants();
  console.log(result.length);
  return res.json(result);
});


// router.get('/grants', async (req, res) => {
//   let result = await getAllGrants();
//   return res.json(result);
// });

export default router;