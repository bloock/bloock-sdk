import {BloockClient} from '../dist/index';

export function getSdk(): BloockClient {
  const apiKey = process.env['API_KEY'] || '';
  const apiHost = process.env['API_HOST'] || '';
  const client = new BloockClient(apiKey, apiHost);
  client.setApiHost(apiHost);
  return client;
}

export function randHex(len: number): string {
  const maxlen = 8;
  const min = Math.pow(16, Math.min(len, maxlen) - 1);
  const max = Math.pow(16, Math.min(len, maxlen)) - 1;
  const n = Math.floor(Math.random() * (max - min + 1)) + min;
  let r = n.toString(16);
  while (r.length < len) {
    r = r + randHex(len - maxlen);
  }
  return r;
}
