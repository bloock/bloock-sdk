import os

import bloock


def init_sdk():
    bloock.api_key = os.environ.get("API_KEY")
    bloock.disable_analytics = True