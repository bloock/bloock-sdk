package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class SubjectCertificateParams {
  String commonName;

  String organization;
  String organizationUnit;
  String location;
  String state;
  String country;

  public SubjectCertificateParams(
      String commonName,
      String organization,
      String organizationUnit,
      String location,
      String state,
      String country) {
    this.commonName = commonName;
    this.organization = organization;
    this.organizationUnit = organizationUnit;
    this.location = location;
    this.state = state;
    this.country = country;
  }

  public KeysEntities.CertificateSubject toProto() {
    KeysEntities.CertificateSubject.Builder params = KeysEntities.CertificateSubject.newBuilder();

    if (!this.commonName.isEmpty()) {
      params.setCommonName(this.commonName);
    }

    if (!this.organization.isEmpty()) {
      params.setCommonName(this.organization);
    }

    if (!this.organizationUnit.isEmpty()) {
      params.setCommonName(this.organizationUnit);
    }

    if (!this.location.isEmpty()) {
      params.setCommonName(this.location);
    }

    if (!this.state.isEmpty()) {
      params.setCommonName(this.state);
    }

    if (!this.country.isEmpty()) {
      params.setCommonName(this.country);
    }

    return params.build();
  }

  public String getCommonName() {
    return commonName;
  }

  public String getOrganization() {
    return organization;
  }

  public String getOrganizationUnit() {
    return organizationUnit;
  }

  public String getLocation() {
    return location;
  }

  public String getState() {
    return state;
  }

  public String getCountry() {
    return country;
  }
}
