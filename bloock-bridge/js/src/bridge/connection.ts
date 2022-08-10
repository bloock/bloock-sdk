import { ServiceError } from "@grpc/grpc-js";
import { FFIClient } from "../ffi/ffi";

export interface RequestCallback<ResponseType> {
  (err: ServiceError | null, value?: ResponseType): void;
}

export const makeRequest = <RequestType, ResponseType>(
  ffiClient: FFIClient,
  method: string,
  serialize: (value: RequestType) => Buffer,
  deserialize: (value: Buffer) => ResponseType,
  argument: RequestType,
  callback: RequestCallback<ResponseType>
): void => {
  const requestType = method;
  let payload = serialize(argument);

  ffiClient
    .request(requestType, payload.toString())
    .then((responsePayload) => {
      let response = deserialize(Buffer.from(responsePayload, "utf-8"));

      callback(null, response);
    })
    .catch((err) => {
      callback(err, undefined);
    });
};
