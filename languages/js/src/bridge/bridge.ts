import { Connection } from "./connection";
import {
  AuthenticityService,
  AuthenticityServiceClientImpl
} from "./proto/bloock_authenticity";
import {
  AvailabilityService,
  AvailabilityServiceClientImpl
} from "./proto/bloock_availability";
import {
  EncryptionService,
  EncryptionServiceClientImpl
} from "./proto/bloock_encryption";
import {
  IdentityService,
  IdentityServiceClientImpl
} from "./proto/bloock_identity";
import {
  IdentityCoreService,
  IdentityCoreServiceClientImpl
} from "./proto/bloock_identity_core";
import {
  IntegrityService,
  IntegrityServiceClientImpl
} from "./proto/bloock_integrity";
import { KeyService, KeyServiceClientImpl } from "./proto/bloock_keys";
import { RecordService, RecordServiceClientImpl } from "./proto/bloock_record";
import {
  WebhookService,
  WebhookServiceClientImpl
} from "./proto/bloock_webhook";

export class BloockBridge {
  private authenticity: AuthenticityService;
  private availability: AvailabilityService;
  private encryption: EncryptionService;
  private identity: IdentityService;
  private identityCore: IdentityCoreService;
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
    this.identityCore = new IdentityCoreServiceClientImpl(connection);
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

  public getIdentityCore(): IdentityCoreService {
    return this.identityCore;
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
