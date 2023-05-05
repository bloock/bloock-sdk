package com.bloock.sdk.client;

import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.RecordEntities.RecordTypes;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.availability.Loader;
import com.bloock.sdk.entity.record.Record;

public class RecordClient {
  private final ConfigData configData;

  public RecordClient() {
    this.configData = Config.newConfigDataDefault();
  }

  public RecordClient(ConfigData configData) {
    this.configData = Config.newConfigData(configData);
  }

  public RecordBuilder fromRecord(Record record) {
    return new RecordBuilder(record.toProto(), RecordTypes.RECORD, this.configData);
  }

  public RecordBuilder fromString(String str) {
    return new RecordBuilder(str, RecordTypes.STRING, this.configData);
  }

  public RecordBuilder fromHex(String str) {
    return new RecordBuilder(str, RecordTypes.HEX, this.configData);
  }

  public RecordBuilder fromJson(String json) {
    return new RecordBuilder(json, RecordTypes.JSON, this.configData);
  }

  public RecordBuilder fromFile(byte[] file) {
    return new RecordBuilder(file, RecordTypes.FILE, this.configData);
  }

  public RecordBuilder fromBytes(byte[] bytes) {
    return new RecordBuilder(bytes, RecordTypes.BYTES, this.configData);
  }

  public RecordBuilder fromLoader(Loader loader) {
    return new RecordBuilder(loader.toProto(), RecordTypes.LOADER, this.configData);
  }
}
