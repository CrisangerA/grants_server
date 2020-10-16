//import { connection } from '../config/ormconnection';
import { getRepository } from 'typeorm';

export const getAllGrants = async () => {
  try {
    let grants = [];
    grants = await getRepository('grants').find();
    return grants;
  } catch (e) {
    return [];
  }
};

export const registerGrants = async (grants) => {
  try {
    await getRepository('grants').save(grants);
    return true;
  } catch (e) {
    return false;
  }
};