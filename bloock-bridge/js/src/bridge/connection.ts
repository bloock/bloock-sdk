import { ServiceError } from 'grpc';
import { FFIClient } from '../native/ffi.js';

export interface RequestCallback<ResponseType> {
  (err: ServiceError | null, value?: ResponseType): void;
}

export const makeRequest = <RequestType, ResponseType>(
  method: string,
  serialize: (value: RequestType) => Buffer,
  deserialize: (value: Buffer) => ResponseType,
  argument: RequestType,
  callback: RequestCallback<ResponseType>
): void => {
  const requestType = method;
  let payload = serialize(argument);

  let responsePayload = FFIClient.request(requestType, payload.toString());
  let response = deserialize(Buffer.from(responsePayload, 'utf-8'));

  callback(null, response);
};
