from bloock._bridge import bridge
from bloock._bridge.proto.keys_pb2 import GenerateLocalKeyRequest, GenerateManagedKeyRequest, LoadLocalKeyRequest, \
    LoadManagedKeyRequest, GenerateManagedCertificateRequest, LoadManagedCertificateRequest, \
    ImportManagedCertificateRequest, GenerateLocalCertificateRequest, LoadLocalCertificateRequest, SetupTotpAccessControlRequest, \
    RecoverTotpAccessControlRequest, SetupSecretAccessControlRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.key.certificate_type import CertificateType
from bloock.entity.key.import_certificate_params import ImportCertificateParams
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.local_key import LocalKey
from bloock.entity.key.managed_certificate import ManagedCertificate
from bloock.entity.key.local_certificate import LocalCertificate
from bloock.entity.key.managed_certificate_params import ManagedCertificateParams
from bloock.entity.key.local_certificate_params import LocalCertificateParams
from bloock.entity.key.managed_key import ManagedKey
from bloock.entity.key.managed import Managed
from bloock.entity.key.totp_access_control_receipt import TotpAccessControlReceipt
from bloock.entity.key.managed_key_params import ManagedKeyParams


class KeyClient:
    """
    Provides functionality to interact with the [Bloock Keys service](https://dashboard.bloock.com/login)
    """
    def __init__(self, config_data=None) -> None:
        """
        Creates a new KeyClient with the given configuration.
        :type config_data: object
        :rtype: object
        """
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def new_local_key(self, key_type: KeyType) -> LocalKey:
        """
        Generates a new local key of the specified type.
        :type key_type: object
        :rtype: object
        """
        res = self.bridge_client.key().GenerateLocalKey(
            GenerateLocalKeyRequest(
                config_data=self.config_data, key_type=key_type.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return LocalKey.from_proto(res.local_key)

    def load_local_key(self, key_type: KeyType, key: str) -> LocalKey:
        """
        Loads a local key of the specified type from a public key string.
        :type key_type: object
        :rtype: object
        """
        res = self.bridge_client.key().LoadLocalKey(
            LoadLocalKeyRequest(config_data=self.config_data, key_type=key_type.to_proto(), key=key)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return LocalKey.from_proto(res.local_key)

    def new_managed_key(self, params: ManagedKeyParams) -> ManagedKey:
        """
        Generates a new managed key with the specified parameters.
        :type params: object
        :rtype: object
        """
        res = self.bridge_client.key().GenerateManagedKey(
            GenerateManagedKeyRequest(
                config_data=self.config_data, params=params.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return ManagedKey.from_proto(res.managed_key)

    def load_managed_key(self, id: str) -> ManagedKey:
        """
        Loads a managed key by its ID (ex: 51d22546-68f1-4340-b94b-2a80e60b8933).
        :type id: object
        :rtype: object
        """
        res = self.bridge_client.key().LoadManagedKey(
            LoadManagedKeyRequest(config_data=self.config_data, id=id)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return ManagedKey.from_proto(res.managed_key)

    def new_local_certificate(self, params: LocalCertificateParams) -> LocalCertificate:
        """
        Generates a new local certificate with the specified parameters.
        :type params: object
        :rtype: object
        """
        res = self.bridge_client.key().GenerateLocalCertificate(
            GenerateLocalCertificateRequest(
                config_data=self.config_data, params=params.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return LocalCertificate.from_proto(res.local_certificate)

    def load_local_certificate(self, pkcs12: bytes, password: str) -> LocalCertificate:
        """
        Loads a local certificate from a PKCS12 file.
        :type password: object
        :type pkcs12: object
        :rtype: object
        """
        res = self.bridge_client.key().LoadLocalCertificate(
            LoadLocalCertificateRequest(config_data=self.config_data, pkcs12=pkcs12, password=password)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return LocalCertificate.from_proto(res.local_certificate)

    def new_managed_certificate(self, params: ManagedCertificateParams) -> ManagedCertificate:
        """
        Generates a new managed certificate with the specified parameters.
        :type params: object
        :rtype: object
        """
        res = self.bridge_client.key().GenerateManagedCertificate(
            GenerateManagedCertificateRequest(
                config_data=self.config_data, params=params.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return ManagedCertificate.from_proto(res.managed_certificate)

    def load_managed_certificate(self, id: str) -> ManagedCertificate:
        """
        Loads a managed certificate by its ID (ex: ceef5b02-af17-43d8-ae7b-31d9bdf8027f).
        :type id: object
        :rtype: object
        """
        res = self.bridge_client.key().LoadManagedCertificate(
            LoadManagedCertificateRequest(config_data=self.config_data, id=id)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return ManagedCertificate.from_proto(res.managed_certificate)

    def import_managed_certificate(self, _type: CertificateType, certificate: bytes, params: ImportCertificateParams) -> ManagedCertificate:
        """
        Imports a managed certificate with the specified parameters, supported types: .pem, .pfx.
        :type params: object
        :type certificate: object
        :type _type: object
        :rtype: object
        """
        res = self.bridge_client.key().ImportManagedCertificate(
            ImportManagedCertificateRequest(
                config_data=self.config_data,
                certificate_type=_type.to_proto(),
                certificate=certificate,
                password=params.password if params.password is not None else None)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return ManagedCertificate.from_proto(res.managed_certificate)

    def setup_totp_access_control(self, key: Managed) -> TotpAccessControlReceipt:
        """
        Sets up TOTP-based access control for the given managed key or managed certificate.
        :type key: object
        :rtype: object
        """
        res = self.bridge_client.key().SetupTotpAccessControl(
            SetupTotpAccessControlRequest(
                config_data=self.config_data,
                managed_key=key.managed_key.to_proto() if key.managed_key is not None else None,
                managed_certificate=key.managed_certificate.to_proto() if key.managed_certificate is not None else None)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return TotpAccessControlReceipt(res.secret, res.secret_qr, res.recovery_codes)

    def recover_totp_access_control(self, key: Managed, code: str) -> TotpAccessControlReceipt:
        """
        Recovers TOTP-based access control for the given managed key or managed certificate using a recovery code.
        :type code: object
        :type key: object
        :rtype: object
        """
        res = self.bridge_client.key().RecoverTotpAccessControl(
            RecoverTotpAccessControlRequest(
                config_data=self.config_data,
                code=code,
                managed_key=key.managed_key.to_proto() if key.managed_key is not None else None,
                managed_certificate=key.managed_certificate.to_proto() if key.managed_certificate is not None else None)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return TotpAccessControlReceipt(res.secret, res.secret_qr, res.recovery_codes)

    def setup_secret_access_control(self, key: Managed, secret: str, email: str):
        """
        Sets up secret-based access control for the given managed key or managed certificate.
        :type email: object
        :type secret: object
        :type key: object
        :rtype: object
        """
        res = self.bridge_client.key().SetupSecretAccessControl(
            SetupSecretAccessControlRequest(
                config_data=self.config_data,
                secret=secret,
                email=email,
                managed_key=key.managed_key.to_proto() if key.managed_key is not None else None,
                managed_certificate=key.managed_certificate.to_proto() if key.managed_certificate is not None else None)
        )

        if res.error != Error():
            raise Exception(res.error.message)
