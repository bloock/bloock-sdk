import os
from bloock.client.client import Client

client = Client(api_key=os.environ["API_KEY"], host=os.environ["API_HOST"])

anchor = client.get_anchor(anchor_id=500)
print(anchor.__dict__)
