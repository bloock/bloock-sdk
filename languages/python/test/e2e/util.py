import os

import bloock


def init_sdk():
    bloock.api_key = os.environ.get("API_KEY")
    bloock.disable_analytics = True


def init_dev_sdk():
    bloock.api_key = os.environ.get("DEV_API_KEY")
    bloock.api_host = os.environ.get("DEV_API_HOST")

    bloock.disable_analytics = True
