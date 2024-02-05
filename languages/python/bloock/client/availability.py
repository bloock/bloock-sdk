from bloock._bridge import bridge
from bloock._bridge.proto.availability_pb2 import PublishRequest, RetrieveRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.availability.loader import Loader
from bloock.entity.availability.publisher import Publisher
from bloock.entity.record.record import Record


class AvailabilityClient:
    """
    Represents a client for interacting with the [Bloock Availability service](https://dashboard.bloock.com/login).
    """
    def __init__(self, config_data=None) -> None:
        """
        Creates a new instance of the AvailabilityClient with the provided configuration.
        :type config_data: object
        :rtype: object
        """
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def publish(self, record: Record, publisher: Publisher) -> str:
        """
        Publishes a Bloock record to the Availability service using the specified publisher.
        :type publisher: object
        :type record: object
        :rtype: object
        """
        client = bridge.BloockBridge()
        req = PublishRequest(
            config_data=self.config_data,
            record=record.to_proto(),
            publisher=publisher.to_proto(),
        )
        res = client.availability().Publish(req)
        if res.error != Error():
            raise Exception(res.error.message)
        return res.id

    def retrieve(self, loader: Loader) -> Record:
        """
        Gets a Bloock record from the Availability service using the specified loader.
        :type loader: object
        :rtype: object
        """
        client = bridge.BloockBridge()
        req = RetrieveRequest(
            config_data=self.config_data,
            loader=loader.to_proto(),
        )
        res = client.availability().Retrieve(req)
        if res.error != Error():
            raise Exception(res.error.message)
        return Record.from_proto(res.record, self.config_data)
