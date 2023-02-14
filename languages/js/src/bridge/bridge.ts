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
import {
  IntegrityService,
  IntegrityServiceClientImpl
} from "./proto/integrity";
import { RecordService, RecordServiceClientImpl } from "./proto/record";
import { WebhookService, WebhookServiceClientImpl } from "./proto/webhook";

export class BloockBridge {
  private authenticity: AuthenticityService;
  private availability: AvailabilityService;
  private encryption: EncryptionService;
  private integrity: IntegrityService;
  private record: RecordService;
  private webhook: WebhookService;

  constructor() {
    let connection = new Connection();

    this.authenticity = new AuthenticityServiceClientImpl(connection);
    this.availability = new AvailabilityServiceClientImpl(connection);
    this.encryption = new EncryptionServiceClientImpl(connection);
    this.integrity = new IntegrityServiceClientImpl(connection);
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

  public getIntegrity(): IntegrityService {
    return this.integrity;
  }

  public getRecord(): RecordService {
    return this.record;
  }

  public getWebhook(): WebhookService {
    return this.webhook;
  }
}
