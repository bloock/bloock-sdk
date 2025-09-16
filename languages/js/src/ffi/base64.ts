export const base64ToBytes = (base64: string): Uint8Array => {
  return new Uint8Array(Buffer.from(base64, "base64"));
};

export const bytesToBase64 = (bytes: Uint8Array): string => {
  return Buffer.from(bytes).toString("base64")
};
