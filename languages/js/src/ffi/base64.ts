import { Base64 } from 'js-base64';

export const base64ToBytes = (base64: string): Uint8Array => {
  return Base64.toUint8Array(base64);
};

export const bytesToBase64 = (bytes: Uint8Array): string => {
  return Base64.fromUint8Array(bytes)
};
