//import { connection } from '../config/ormconnection';
import { getRepository, createQueryBuilder } from 'typeorm';

export const getAllGrants = async () => {
  try {
    let grants = [];
    grants = await getRepository('grants').find();
    return grants;
  } catch (e) {
    return [];
  }
};

export const getGrants = async (page, limit) => {
  try {
    let grants = [];
    grants = await getRepository('grants').createQueryBuilder().skip((page) * limit).take(limit).getMany();
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

export const dropGrants = async (grants) => {
  try {
    await getRepository('grants').
      createQueryBuilder()
      .delete()
      .from('grants')
      .execute();
    return true;
  } catch (e) {
    return false;
  }
};