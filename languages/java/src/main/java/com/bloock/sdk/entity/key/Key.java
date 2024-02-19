package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

/**
 * Represents a key entity that can be either a ManagedKey or a LocalKey.
 */
public class Key {
    LocalKey localKey;
    ManagedKey managedKey;

    /**
     * Constructs a Key object for a given local key object.
     * @param localKey
     */
    public Key(LocalKey localKey) {
        this.localKey = localKey;
    }

    /**
     * Constructs a Key object for a given managed key object.
     * @param managedKey
     */
    public Key(ManagedKey managedKey) {
        this.managedKey = managedKey;
    }

    public KeysEntities.Key toProto() {
        KeysEntities.Key.Builder builder = KeysEntities.Key.newBuilder();

        if (this.localKey != null) {
            builder.setLocalKey(this.localKey.toProto());
        }

        if (this.managedKey != null) {
            builder.setManagedKey(this.managedKey.toProto());
        }

        return builder.build();
    }

    /**
     * Gets the local key object.
     * @return
     */
    public LocalKey getLocalKey() {
        return localKey;
    }

    /**
     * Gets the managed key object.
     * @return
     */
    public ManagedKey getManagedKey() {
        return managedKey;
    }
}
