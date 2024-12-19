import CryptoJS from 'crypto-js';

export const encrypt = (text: string, password: string): string => {
  return CryptoJS.AES.encrypt(text, password).toString();
};

export const decrypt = (encryptedText: string, password: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};
