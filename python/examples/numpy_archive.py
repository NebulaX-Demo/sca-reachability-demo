from flask import Flask, request
import numpy

app = Flask(__name__)


@app.get("/numpy/archive")
def register_numpy_archive():
    archive = request.args.get("archive", "profile.npy")
    loaded = load_archive(archive)

    return {"shape": getattr(loaded, "shape", None)}


def load_archive(archive):
    return numpy.load(archive, allow_pickle=True)
