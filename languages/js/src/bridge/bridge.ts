import { Connection } from "./connection";
import { AnchorService, AnchorServiceClientImpl } from "./proto/anchor";
import { ProofService, ProofServiceClientImpl } from "./proto/proof";
import { RecordService, RecordServiceClientImpl } from "./proto/record";
import { WebhookService, WebhookServiceClientImpl } from "./proto/webhook";

export class BloockBridge {
  private anchor: AnchorService;
  private record: RecordService;
  private proof: ProofService;
  private webhook: WebhookService;

  constructor() {
    let connection = new Connection();

    this.anchor = new AnchorServiceClientImpl(connection);
    this.record = new RecordServiceClientImpl(connection);
    this.proof = new ProofServiceClientImpl(connection);
    this.webhook = new WebhookServiceClientImpl(connection);
  }

  public getAnchor(): AnchorService {
    return this.anchor;
  }

  public getRecord(): RecordService {
    return this.record;
  }

  public getProof(): ProofService {
    return this.proof;
  }

  public getWebhook(): WebhookService {
    return this.webhook;
  }
}
