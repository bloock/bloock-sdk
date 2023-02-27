from bloock._bridge import bridge
from bloock._bridge.proto.shared_pb2 import Error
from bloock._bridge.proto.webhook_pb2 import VerifyWebhookSignatureRequest
from bloock._config.config import Config


class WebhookClient:
    def __init__(self, config_data=None) -> None:
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def verify_webhook_signature(
            self, payload: bytes, header: str, secret_key: str, enforce_tolerance: bool
    ) -> int:
        res = self.bridge_client.webhook().VerifyWebhookSignature(
            VerifyWebhookSignatureRequest(
                config_data=self.config_data,
                payload=payload,
                header=header,
                secretKey=secret_key,
                enforceTolerance=enforce_tolerance,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.is_valid
