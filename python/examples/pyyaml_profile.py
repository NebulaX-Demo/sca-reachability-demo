from flask import Flask, request
import yaml

app = Flask(__name__)


@app.get("/pyyaml/profile")
def register_pyyaml_profile():
    payload = request.args.get("profile", "name: demo\nrole: maintainer")
    profile = load_profile(payload)

    return {"profile": profile}


def load_profile(payload):
    return yaml.load(payload, Loader=yaml.Loader)
