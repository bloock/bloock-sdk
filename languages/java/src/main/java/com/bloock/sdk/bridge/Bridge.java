package com.bloock.sdk.bridge;

import com.bloock.sdk.bridge.proto.AnchorServiceGrpc;
import com.bloock.sdk.bridge.proto.ProofServiceGrpc;
import com.bloock.sdk.bridge.proto.RecordServiceGrpc;
import com.bloock.sdk.bridge.proto.WebhookServiceGrpc;

public class Bridge {
  private final AnchorServiceGrpc.AnchorServiceBlockingStub anchor;
  private final RecordServiceGrpc.RecordServiceBlockingStub record;
  private final ProofServiceGrpc.ProofServiceBlockingStub proof;
  private final WebhookServiceGrpc.WebhookServiceBlockingStub webhook;

  public Bridge() {
    Connection conn = new Connection();
    anchor = AnchorServiceGrpc.newBlockingStub(conn);
    record = RecordServiceGrpc.newBlockingStub(conn);
    proof = ProofServiceGrpc.newBlockingStub(conn);
    webhook = WebhookServiceGrpc.newBlockingStub(conn);
  }

  public AnchorServiceGrpc.AnchorServiceBlockingStub getAnchor() {
    return this.anchor;
  }

  public RecordServiceGrpc.RecordServiceBlockingStub getRecord() {
    return this.record;
  }

  public ProofServiceGrpc.ProofServiceBlockingStub getProof() {
    return this.proof;
  }

  public WebhookServiceGrpc.WebhookServiceBlockingStub getWebhook() {
    return this.webhook;
  }
}
