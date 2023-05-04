package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;
import java.util.List;
import java.util.stream.Collectors;

public class CredentialOfferBody {
  private final String url;
  private final List<CredentialOfferCredential> credentials;

  public CredentialOfferBody(String url, List<CredentialOfferCredential> credentials) {
    this.url = url;
    this.credentials = credentials;
  }

  public static CredentialOfferBody fromProto(IdentityEntities.CredentialOfferBody res) {
    return new CredentialOfferBody(
        res.getUrl(),
        res.getCredentialsList().stream()
            .map(CredentialOfferCredential::fromProto)
            .collect(Collectors.toList()));
  }

  public IdentityEntities.CredentialOfferBody toProto() {
    return IdentityEntities.CredentialOfferBody.newBuilder()
        .setUrl(this.url)
        .addAllCredentials(
            this.credentials.stream()
                .map(CredentialOfferCredential::toProto)
                .collect(Collectors.toList()))
        .build();
  }

  public String getUrl() {
    return url;
  }

  public List<CredentialOfferCredential> getCredentials() {
    return credentials;
  }
}
