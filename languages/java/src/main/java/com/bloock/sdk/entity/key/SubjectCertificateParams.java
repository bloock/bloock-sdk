package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents parameters for generating a subject certificate.
 */
public class SubjectCertificateParams {
  /**
   * Is the common name (CN) for the certificate. Required.
   */
  String commonName;
  /**
   * Is the organization (O) for the certificate. (Optional)
   */
  String organization;
  /**
   * Is the organizational unit (OU) for the certificate. (Optional)
   */
  String organizationUnit;
  /**
   * Is the location (L) for the certificate. (Optional)
   */
  String location;
  /**
   * Is the state or province (ST) for the certificate. (Optional)
   */
  String state;
  /**
   * Is the country (C) for the certificate. (Optional)
   */
  String country;

  /**
   * Constructs a SubjectCertificateParams object with the specified parameters.
   * 
   * @param commonName
   * @param organization
   * @param organizationUnit
   * @param location
   * @param state
   * @param country
   */
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

  public BloockKeysEntities.CertificateSubject toProto() {
    BloockKeysEntities.CertificateSubject.Builder params = BloockKeysEntities.CertificateSubject.newBuilder();

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

  /**
   * Gets the common name attribute of the subject certificate.
   * 
   * @return
   */
  public String getCommonName() {
    return commonName;
  }

  /**
   * Gets the organization attribute of the subject certificate.
   * 
   * @return
   */
  public String getOrganization() {
    return organization;
  }

  /**
   * Gets the organization unit attribute of the subject certificate.
   * 
   * @return
   */
  public String getOrganizationUnit() {
    return organizationUnit;
  }

  /**
   * Gets the location attribute of the subject certificate.
   * 
   * @return
   */
  public String getLocation() {
    return location;
  }

  /**
   * Gets the state attribute of the subject certificate.
   * 
   * @return
   */
  public String getState() {
    return state;
  }

  /**
   * Gets the country attribute of the subject certificate.
   * 
   * @return
   */
  public String getCountry() {
    return country;
  }
}
