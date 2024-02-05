import { CertificateSubject } from "../../bridge/proto/keys_entities";

/**
 * Represents parameters for generating a subject certificate.
 */
export class SubjectCertificateParams {
  /**
   * Is the common name (CN) for the certificate. Required.
   */
  commonName: string;
  /**
   * Is the organization (O) for the certificate. (Optional)
   */
  organization?: string | undefined;
  /**
   * Is the organizational unit (OU) for the certificate. (Optional)
   */
  organizationUnit?: string | undefined;
  /**
   * Is the location (L) for the certificate. (Optional)
   */
  location?: string | undefined;
  /**
   * Is the state or province (ST) for the certificate. (Optional)
   */
  state?: string | undefined;
  /**
   * Is the country (C) for the certificate. (Optional)
   */
  country?: string | undefined;

  /**
   * Constructs a SubjectCertificateParams object with the specified parameters.
   * @param commonName 
   * @param organization 
   * @param organizationUnit 
   * @param location 
   * @param state 
   * @param country 
   */
  constructor(
    commonName: string,
    organization?: string | undefined,
    organizationUnit?: string | undefined,
    location?: string | undefined,
    state?: string | undefined,
    country?: string | undefined
  ) {
    this.commonName = commonName;
    this.organization = organization;
    this.organizationUnit = organizationUnit;
    this.location = location;
    this.state = state;
    this.country = country;
  }

  public toProto(): CertificateSubject {
    return CertificateSubject.fromPartial({
      commonName: this.commonName,
      organization: this.organization,
      organizationalUnit: this.organizationUnit,
      location: this.location,
      state: this.state,
      country: this.country
    });
  }
}
