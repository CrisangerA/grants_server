import path from 'path';
import { createConnection } from 'typeorm';
import log from '../helpers/log';
import config from './config';

export const connection = async () => {
  try {
    const c = await createConnection({
      type: 'postgres',
      host: config.DB.HOST,
      port: typeof config.DB.PORT === "string" ? parseInt(config.DB.PORT) : config.DB.PORT,
      username: config.DB.USER,
      password: config.DB.PASSWORD,
      database: config.DB.DATABASE,
      entities: [
        path.join(__dirname, '../entities/**/*.js')
      ],
      synchronize: true,
    });
    console.log('DB is conected');
    return c;
  } catch (e) {
    log.createLog(e, ['ormconnection.js', 'connection()'])
    return null;
  }
}