import { ServiceDefinition } from "@grpc/grpc-js";
import { FFIClient } from "../ffi/ffi";
import { makeRequest } from "./connection";
import * as BloockGRPC from "./proto/bloock";

export class BloockBridge {
  private greeting: BloockGRPC.GreeterClient;

  constructor() {
    this.greeting = new (this.createClient(BloockGRPC.GreeterService) as any)();
  }

  public getGreeting(): BloockGRPC.GreeterClient {
    return this.greeting;
  }

  private createClient(methods: ServiceDefinition): ServiceClientConstructor {
    class ServiceClientImpl implements ServiceClient {
      static service: ServiceDefinition;
      static serviceName: string;
      [methodName: string]: Function;
    }

    Object.keys(methods).forEach((name) => {
      if (this.isPrototypePolluted(name)) {
        return;
      }
      const attrs = methods[name];
      if (typeof name === "string" && name.charAt(0) === "$") {
        throw new Error("Method names cannot start with $");
      }
      const serialize = attrs.requestSerialize;
      const deserialize = attrs.responseDeserialize;
      const methodFunc = this.partial(
        makeRequest,
        new FFIClient(),
        attrs.path,
        serialize,
        deserialize
      );
      ServiceClientImpl.prototype[name] = methodFunc;
      // Associate all provided attributes with the method
      Object.assign(ServiceClientImpl.prototype[name], attrs);
    });

    ServiceClientImpl.service = methods;
    ServiceClientImpl.serviceName = "serviceName";

    return ServiceClientImpl;
  }

  private partial(
    fn: Function,
    ffiClient: FFIClient,
    path: string,
    serialize: Function,
    deserialize: Function
  ): Function {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (this: any, ...args: any[]) {
      return fn.call(this, ffiClient, path, serialize, deserialize, ...args);
    };
  }

  private isPrototypePolluted(key: string) {
    return ["__proto__", "prototype", "constructor"].indexOf(key) >= 0;
  }
}

interface ServiceClient {
  [methodName: string]: Function;
}

interface ServiceClientConstructor {
  new (): ServiceClient;
  service: ServiceDefinition;
  serviceName: string;
}
