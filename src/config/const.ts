import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const MSPACE_AUTH_TOKEN = process.env.MSPACE_AUTH_TOKEN;
export const MSPACE_APPID = process.env.MSPACE_APPID;
export const MSPACE_APPKEY= process.env.MSPACE_APPKEY;
export const MSPACE_OTP_URL = process.env.MSPACE_OTP_URL;
export const MSPACE_OTP_VERIFY_URL = process.env.MSPACE_OTP_VERIFY_URL;
export const MSPACE_SUBSCRIBE_URL = process.env.MSPACE_SUBSCRIBE_URL;
export const MSPACE_PAYMENT_URL = process.env.MSPACE_PAYMENT_URL;
export const MSPACE_SMS_URL = process.env.MSPACE_SMS_URL;
export const MSPACE_SMS_CLIENT_ID = process.env.MSPACE_SMS_CLIENT_ID;

export const USER_URL = 'http://localhost:1337/api/players';
export const QUESTIONS_URL = 'http://localhost:1337/api/q-pools';
