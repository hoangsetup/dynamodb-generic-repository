/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */

import dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENTS = {
  DYNAMO_ENDPOINT: process.env.DYNAMO_ENDPOINT || 'http://localhost:8000',
  REGION: process.env.REGION || 'local',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
};
