package com.bloock.sdk.bridge;

import com.bloock.sdk.bridge.proto.*;

public class Bridge {
  private final AuthenticityServiceGrpc.AuthenticityServiceBlockingStub authenticity;
  private final AvailabilityServiceGrpc.AvailabilityServiceBlockingStub availability;
  private final EncryptionServiceGrpc.EncryptionServiceBlockingStub encryption;
  private final IdentityServiceGrpc.IdentityServiceBlockingStub identity;
  private final IdentityServiceV2Grpc.IdentityServiceV2BlockingStub identityV2;
  private final IntegrityServiceGrpc.IntegrityServiceBlockingStub integrity;
  private final KeyServiceGrpc.KeyServiceBlockingStub key;
  private final RecordServiceGrpc.RecordServiceBlockingStub record;
  private final WebhookServiceGrpc.WebhookServiceBlockingStub webhook;

  public Bridge() {
    Connection conn = new Connection();
    authenticity = AuthenticityServiceGrpc.newBlockingStub(conn);
    availability = AvailabilityServiceGrpc.newBlockingStub(conn);
    encryption = EncryptionServiceGrpc.newBlockingStub(conn);
    identity = IdentityServiceGrpc.newBlockingStub(conn);
    identityV2 = IdentityServiceV2Grpc.newBlockingStub(conn);
    integrity = IntegrityServiceGrpc.newBlockingStub(conn);
    key = KeyServiceGrpc.newBlockingStub(conn);
    record = RecordServiceGrpc.newBlockingStub(conn);
    webhook = WebhookServiceGrpc.newBlockingStub(conn);
  }

  public AuthenticityServiceGrpc.AuthenticityServiceBlockingStub getAuthenticity() {
    return this.authenticity;
  }

  public AvailabilityServiceGrpc.AvailabilityServiceBlockingStub getAvailability() {
    return this.availability;
  }

  public EncryptionServiceGrpc.EncryptionServiceBlockingStub getEncryption() {
    return this.encryption;
  }

  public IntegrityServiceGrpc.IntegrityServiceBlockingStub getIntegrity() {
    return this.integrity;
  }

  public RecordServiceGrpc.RecordServiceBlockingStub getRecord() {
    return this.record;
  }

  public WebhookServiceGrpc.WebhookServiceBlockingStub getWebhook() {
    return this.webhook;
  }

  public IdentityServiceGrpc.IdentityServiceBlockingStub getIdentity() {
    return identity;
  }

  public IdentityServiceV2Grpc.IdentityServiceV2BlockingStub getIdentityV2() {
    return identityV2;
  }

  public KeyServiceGrpc.KeyServiceBlockingStub getKey() {
    return key;
  }
}
