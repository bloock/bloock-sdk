import { Connection } from "./connection";
import {
  AuthenticityService,
  AuthenticityServiceClientImpl
} from "./proto/authenticity";
import {
  AvailabilityService,
  AvailabilityServiceClientImpl
} from "./proto/availability";
import {
  EncryptionService,
  EncryptionServiceClientImpl
} from "./proto/encryption";
import { IdentityService, IdentityServiceClientImpl } from "./proto/identity";
import {
  IdentityServiceV2,
  IdentityServiceV2ClientImpl
} from "./proto/identity_v2";
import {
  IntegrityService,
  IntegrityServiceClientImpl
} from "./proto/integrity";
import { KeyService, KeyServiceClientImpl } from "./proto/keys";
import { RecordService, RecordServiceClientImpl } from "./proto/record";
import { WebhookService, WebhookServiceClientImpl } from "./proto/webhook";

export class BloockBridge {
  private authenticity: AuthenticityService;
  private availability: AvailabilityService;
  private encryption: EncryptionService;
  private identity: IdentityService;
  private identityV2: IdentityServiceV2;
  private integrity: IntegrityService;
  private key: KeyService;
  private record: RecordService;
  private webhook: WebhookService;

  constructor() {
    let connection = new Connection();

    this.authenticity = new AuthenticityServiceClientImpl(connection);
    this.availability = new AvailabilityServiceClientImpl(connection);
    this.encryption = new EncryptionServiceClientImpl(connection);
    this.key = new KeyServiceClientImpl(connection);
    this.integrity = new IntegrityServiceClientImpl(connection);
    this.identity = new IdentityServiceClientImpl(connection);
    this.identityV2 = new IdentityServiceV2ClientImpl(connection);
    this.record = new RecordServiceClientImpl(connection);
    this.webhook = new WebhookServiceClientImpl(connection);
  }

  public getAuthenticity(): AuthenticityService {
    return this.authenticity;
  }

  public getAvailability(): AvailabilityService {
    return this.availability;
  }

  public getEncryption(): EncryptionService {
    return this.encryption;
  }

  public getIdentity(): IdentityService {
    return this.identity;
  }

  public getIdentityV2(): IdentityServiceV2 {
    return this.identityV2;
  }

  public getIntegrity(): IntegrityService {
    return this.integrity;
  }

  public getKey(): KeyService {
    return this.key;
  }

  public getRecord(): RecordService {
    return this.record;
  }

  public getWebhook(): WebhookService {
    return this.webhook;
  }
}
