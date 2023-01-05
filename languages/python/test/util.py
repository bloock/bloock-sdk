import os
import bloock
from bloock.client.client import Client


def get_sdk() -> Client:
    bloock.api_key = os.environ["API_KEY"]
    api_host = os.environ.get("API_HOST")
    if api_host != None:
        bloock.api_host = api_host
    bloock.disable_analytics = True
    return Client()
