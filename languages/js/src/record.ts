import stringify from 'json-stable-stringify';
import { WasmRecord } from './bloock_wasm_api';

/**
 * Record is the class in charge of computing and storing the
 * value of the data sent to Bloock.
 * This class is intended to be used by calling "from" static
 * methods to create instances of Record.
 */
export class Record {
  ffi: WasmRecord;

  private constructor(ffi: WasmRecord) {
    this.ffi = ffi;
  }

  // ------------------------------------------
  // BASIC TYPE CONSTRUCTORS
  // ------------------------------------------

  /**
   * Given a value already hashed creates a Record containing it.
   * @param  {string} hash Hexadecimal string without prefix and length 64.
   * @returns {Record} Record object of the hashed input.
   */
  static fromHash(hash: string): Record {
    return new Record(WasmRecord.fromHash(hash));
  }
  /**
   * Given a hexadecimal string (with no 0x prefix) returns a Record with its value hashed.
   * @param  {string} hex Hexadecimal string without prefix.
   * @returns {Record} Record object of the hashed input.
   */
  static fromHex(hex: string): Record {
    return new Record(WasmRecord.fromHex(hex));
  }
  /**
   * Given a string returns a Record with its value hashed.
   * @param  {string} _string String object.
   * @returns {Record} Record object of the hashed input.
   */
  static fromString(_string: string): Record {
    return new Record(WasmRecord.fromString(_string));
  }
  /**
   * Given a bytes object returns a Record with its value hashed.
   * @param  {TypedArray} src TypedArray object.
   * @returns {Record} Record object of the hashed input.
   */
  static fromTypedArray(src: Uint8Array): Record {
    return new Record(WasmRecord.fromTypedArray(src));
  }
  /**
   * Given a bytes object returns a Record with its value hashed.
   * @deprecated use fromTypedArray instead
   * @param  {Uint8Array} _uint8Array Bytes object.
   * @returns {Record} Record object of the hashed input.
   */
  static fromUint8Array(_uint8Array: Uint8Array): Record {
    return new Record(WasmRecord.fromTypedArray(_uint8Array));
  }

  /**
   * Given an JSON object, returns a Record with its value hashed.
   * @deprecated use fromJSON method instead
   * @param  {any} data
   * @returns {Record} Record object of the hashed input.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  static fromObject(data: any): Record {
    return new Record(WasmRecord.fromJson(stringify(data)));
  }

  // ------------------------------------------
  // PUBLIC FUNCTIONS
  // ------------------------------------------

  /**
   * Returns the hashed representation of the Record string.
   * @returns {string} String containing the Record hash as a hexadecimal (with no "0x" prefix).
   */
  public getHash(): string {
    return this.ffi.getHash();
  }

  toWasm(): any {
    return {
      hash: this.getHash(),
    };
  }
}
