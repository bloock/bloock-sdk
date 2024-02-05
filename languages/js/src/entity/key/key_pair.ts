/**
 * Represents a pair of public and private keys.
 */
export class KeyPair {
  publicKey: string;
  privateKey: string;

  /**
   * Constructs a KeyPair object with the specified parameters.
   * @param publicKey 
   * @param privateKey 
   */
  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}
