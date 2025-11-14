import crypto from 'crypto-js';

const STORAGE_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY || 'stackskills-secret-key';

export function encryptData(data: string): string {
  return crypto.AES.encrypt(data, STORAGE_KEY).toString();
}

export function decryptData(encryptedData: string): string {
  const bytes = crypto.AES.decrypt(encryptedData, STORAGE_KEY);
  return bytes.toString(crypto.enc.Utf8);
}