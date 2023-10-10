import { CertificateSubject } from "../../bridge/proto/keys_entities";

export class SubjectCertificateParams {
    commonName: string;
    organization?: string | undefined;
    organizationUnit?: string | undefined;
    location?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;

    constructor(commonName: string, organization?: string | undefined, organizationUnit?: string | undefined, location?: string | undefined, state?: string | undefined, country?: string | undefined) {
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
            country: this.country,
        });
    }
}