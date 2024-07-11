package com.bloock.sdk.client;

import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockRecordEntities.RecordTypes;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.availability.Loader;
import com.bloock.sdk.entity.record.Record;

/**
 * Provides functionality for creating records using various data sources and to
 * interact with the <a href="https://dashboard.bloock.com/login">Bloock Record
 * service</a>.
 */
public class RecordClient {
  private final ConfigData configData;

  /**
   * Creates a new RecordClient with default configuration.
   */
  public RecordClient() {
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new RecordClient with the provided configuration.
   * 
   * @param configData
   */
  public RecordClient(ConfigData configData) {
    this.configData = Config.newConfigData(configData);
  }

  /**
   * Creates a RecordBuilder from an existing record.
   * 
   * @param record
   * @return
   */
  public RecordBuilder fromRecord(Record record) {
    return new RecordBuilder(record.toProto(), RecordTypes.RECORD, this.configData);
  }

  /**
   * Creates a RecordBuilder from a data loader.
   * 
   * @param loader
   * @return
   */
  public RecordBuilder fromLoader(Loader loader) {
    return new RecordBuilder(loader.toProto(), RecordTypes.LOADER, this.configData);
  }

  /**
   * Creates a RecordBuilder from a string payload.
   * 
   * @param str
   * @return
   */
  public RecordBuilder fromString(String str) {
    return new RecordBuilder(str, RecordTypes.STRING, this.configData);
  }

  /**
   * Creates a RecordBuilder from a hexadecimal string payload.
   * 
   * @param str
   * @return
   */
  public RecordBuilder fromHex(String str) {
    return new RecordBuilder(str, RecordTypes.HEX, this.configData);
  }

  /**
   * Creates a RecordBuilder from a JSON string payload.
   * 
   * @param json
   * @return
   */
  public RecordBuilder fromJson(String json) {
    return new RecordBuilder(json, RecordTypes.JSON, this.configData);
  }

  /**
   * Creates a RecordBuilder from a byte slice representing a file.
   * 
   * @param file
   * @return
   */
  public RecordBuilder fromFile(byte[] file) {
    return new RecordBuilder(file, RecordTypes.FILE, this.configData);
  }

  /**
   * Creates a RecordBuilder from a byte slice payload.
   * 
   * @param bytes
   * @return
   */
  public RecordBuilder fromBytes(byte[] bytes) {
    return new RecordBuilder(bytes, RecordTypes.BYTES, this.configData);
  }
}
