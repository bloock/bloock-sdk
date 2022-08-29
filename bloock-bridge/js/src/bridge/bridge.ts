import { ServiceDefinition } from "@grpc/grpc-js";
import { FFIClient } from "../ffi/ffi";
import { makeRequest } from "./connection";
import { AnchorServiceClient, AnchorServiceService } from "./proto/anchor";
import * as BloockGRPC from "./proto/bloock";
import { ProofServiceClient, ProofServiceService } from "./proto/proof";
import { RecordServiceClient, RecordServiceService } from "./proto/record";

export class BloockBridge {
  private greeting: BloockGRPC.GreeterClient;
  private anchor: AnchorServiceClient;
  private record: RecordServiceClient;
  private proof: ProofServiceClient;

  constructor() {
    this.greeting = new (this.createClient(BloockGRPC.GreeterService) as any)();
    this.anchor = new (this.createClient(AnchorServiceService) as any)();
    this.record = new (this.createClient(RecordServiceService) as any)();
    this.proof = new (this.createClient(ProofServiceService) as any)();
  }

  public getGreeting(): BloockGRPC.GreeterClient {
    return this.greeting;
  }

  public getAnchor(): AnchorServiceClient {
    return this.anchor;
  }

  public getRecord(): RecordServiceClient {
    return this.record;
  }

  public getProof(): ProofServiceClient {
    return this.proof;
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
  new(): ServiceClient;
  service: ServiceDefinition;
  serviceName: string;
}
