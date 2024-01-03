import os

import bloock


def init_sdk():
    bloock.api_key = os.environ.get("API_KEY")
    bloock.api_host = os.environ.get("API_HOST")
    bloock.identity_api_host = os.environ.get("IDENTITY_API_HOST")
    bloock.disable_analytics = True


def init_dev_sdk():
    bloock.api_key = os.environ.get("DEV_API_KEY")
    bloock.api_host = os.environ.get("DEV_API_HOST")
    bloock.identity_api_host = os.environ.get("DEV_IDENTITY_API_HOST")

    bloock.disable_analytics = True
