import os
import random
import string
import base64
import hashlib
import hmac
import struct

import bloock


def init_sdk():
    bloock.api_key = os.environ.get("API_KEY")
    bloock.api_host = os.environ.get("API_HOST")
    
    bloock.disable_analytics = True


def init_dev_sdk():
    bloock.api_key = os.environ.get("DEV_API_KEY")
    bloock.api_host = os.environ.get("DEV_API_HOST")
    bloock.identity_api_host = os.environ.get("DEV_IDENTITY_API_HOST")

    bloock.disable_analytics = True

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for i in range(length))
    return random_string


def generate_totp_client(secret_key, timestamp):
    base32_decoder = base64.b32decode(secret_key.upper().strip() + '=' * (8 - (len(secret_key) % 8)))

    time_bytes = struct.pack('>Q', timestamp // 30)

    hash_obj = hmac.new(base32_decoder, time_bytes, hashlib.sha1)
    h = hash_obj.digest()

    offset = h[-1] & 0x0F

    truncated_hash = struct.unpack('>I', h[offset:offset + 4])[0] & 0x7FFFFFFF

    return str(truncated_hash % 1_000_000)
