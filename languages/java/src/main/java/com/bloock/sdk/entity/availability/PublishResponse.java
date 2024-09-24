package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailability;

public class PublishResponse {

    /**
     * Is a unique identifier associated with the file uploaded.
     */
    String id;
    /**
     * Is an Ipns key used only when ipns publisher is enabled.
     */
    IpnsKey ipnsKey;

    /**
     * Constructs a PublishResponse object with the specified parameters.
     * 
     * @param id
     * @param ipnsKey
     */
    PublishResponse(String id, IpnsKey ipnsKey) {
    this.id = id;
    this.ipnsKey = ipnsKey;
    }

    public static PublishResponse fromProto(BloockAvailability.PublishResponse response) {
    return new PublishResponse(
        response.getId(), IpnsKey.fromProto(response.getIpnsKey()));
    }


    /**
     * Gets the ID of the publish response.
     * 
     * @return
     */
    public String getID() {
    return id;
    }

    /**
     * Gets the Ipns key of the publish response.
     * 
     * @return
     */
    public IpnsKey getIpnsKey() {
    return ipnsKey;
    }
}
