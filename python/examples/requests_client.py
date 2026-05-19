from flask import Flask, request
import requests

app = Flask(__name__)


@app.get("/requests/client")
def register_requests_client():
    url = request.args.get("url", "https://example.invalid/profile")
    prepared = prepare_profile_request(url)

    return {"method": prepared.method, "url": prepared.url}


def prepare_profile_request(url):
    request = requests.Request("GET", url)
    return request.prepare()
