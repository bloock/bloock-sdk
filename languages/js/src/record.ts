import { BloockBridge } from "./bridge/bridge";
import { FromHashRequest, FromHexRequest, FromStringRequest, FromTypedArrayRequest, Record as ProtoRecord } from "./bridge/proto/record"

export class Record {
    static FromHash(hash: string): Promise<ProtoRecord> {
        let request = FromHashRequest.fromPartial({
            hash: hash,
        });

        let bridge = new BloockBridge();

        return new Promise((resolve, reject) => {
            bridge.getRecord().fromHash(request, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(res);
            });
        });
    }

    static FromHex(hex: string): Promise<ProtoRecord> {
        let request = FromHexRequest.fromPartial({
            hex: hex,
        });

        let bridge = new BloockBridge();

        return new Promise((resolve, reject) => {
            bridge.getRecord().fromHex(request, (err, res) => {
                if (err) {
                    reject(err);
                }

                if (res.error) {
                    reject(res.error.message);
                }

                resolve(res.record!);
            });
        });
    }

    static FromString(str: string): Promise<ProtoRecord> {
        let request = FromStringRequest.fromPartial({
            str: str
        });

        let bridge = new BloockBridge();

        return new Promise((resolve, reject) => {
            bridge.getRecord().fromString(request, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(res);
            });
        });
    }

    static FromTypedArray(array: Buffer): Promise<ProtoRecord> {
        let request = FromTypedArrayRequest.fromPartial({
            array: array
        });

        let bridge = new BloockBridge();

        return new Promise((resolve, reject) => {
            bridge.getRecord().fromTypedArray(request, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(res);
            });
        });
    }
}
