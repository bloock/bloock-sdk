export class Bloock {
  private static instance: Bloock;
  private apiKey: string;

  private constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public static getApiKey(): string {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock("");
    }
    return Bloock.instance.apiKey;
  }

  public static setApiKey(apiKey: string) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock(apiKey);
    } else {
      Bloock.instance.apiKey = apiKey;
    }
  }
}
