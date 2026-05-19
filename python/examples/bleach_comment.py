import bleach
from flask import Flask, request

app = Flask(__name__)


@app.get("/bleach/comment")
def register_bleach_comment():
    fragment = request.args.get("comment", "<strong>demo</strong>")
    cleaned = sanitize_comment(fragment)

    return {"cleaned": cleaned}


def sanitize_comment(fragment):
    return bleach.clean(fragment, tags=["strong", "em", "a"], strip=False)
