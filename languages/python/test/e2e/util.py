import os
import random
import string
import pyotp

import bloock


def init_sdk():
    bloock.api_key = os.environ.get("API_KEY")
    bloock.api_host = os.environ.get("API_HOST")


def init_dev_sdk():
    bloock.api_key = os.environ.get("DEV_API_KEY")
    bloock.api_host = os.environ.get("DEV_API_HOST")
    bloock.identity_api_host = os.environ.get("DEV_IDENTITY_API_HOST")


def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for i in range(length))
    return random_string


def generate_totp_client(secret_key):
    totp = pyotp.TOTP(secret_key)

    return totp.now()
