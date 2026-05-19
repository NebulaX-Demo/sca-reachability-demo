from flask import Flask, request
from lxml import etree

app = Flask(__name__)


@app.get("/lxml/feed")
def register_lxml_feed():
    payload = request.args.get("feed", "<feed><title>demo</title></feed>")
    root = parse_feed(payload)

    return {"root": root.tag}


def parse_feed(payload):
    return etree.fromstring(payload.encode("utf-8"))
