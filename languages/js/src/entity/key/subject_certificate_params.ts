export class SubjectCertificateParams {
    cn: string;
    c: string;
    o: string;
    ou: string

    constructor(cn: string, c: string, o: string, ou: string) {
        this.cn = cn;
        this.c = c;
        this.o = o;
        this.ou = ou;
    }
}